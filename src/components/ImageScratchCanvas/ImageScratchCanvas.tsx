import React, { useRef, useEffect, useState, useCallback } from 'react';
import './ImageScratchCanvas.css';
import { Typography } from "antd";

interface ImageScratchCanvasProps {
    imageSrc?: string;
    width?: number;
    height?: number;
    overlayColor?: string;
}

const ImageScratchCanvas: React.FC<ImageScratchCanvasProps> = ({
                                                                   imageSrc = 'https://upload.wikimedia.org/wikipedia/ru/e/e4/Tyler%2C_the_Creator_-_Igor.jpg',
                                                                   width = 500,
                                                                   height = 500,
                                                                   overlayColor = 'rgb(0,0,0)',
                                                               }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const eraserSize = 1;
    const isInitializedRef = useRef(false);

    // Загрузка изображения
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            imageRef.current = img;
            setIsLoaded(true);
            initializeCanvas();
        };

        img.onerror = () => {
            console.error('Failed to load image:', imageSrc);
            setIsLoaded(false);
        };
    }, [imageSrc]);

    // Инициализация canvas (один раз)
    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image || isInitializedRef.current) return;

        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Устанавливаем размеры
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Масштабируем для Retina
        ctx.scale(dpr, dpr);

        // Отрисовываем начальное состояние
        drawInitialCanvas(ctx, image);

        isInitializedRef.current = true;
    }, [width, height]);

    // Отрисовка начального состояния
    const drawInitialCanvas = useCallback((ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
        // 1. Очищаем canvas
        ctx.clearRect(0, 0, width, height);

        // 2. Рисуем оригинальное изображение
        ctx.drawImage(image, 0, 0, width, height);

        // 3. Сохраняем оригинальное изображение
        const originalImageData = ctx.getImageData(0, 0, width, height);

        // 4. Накладываем цветной фильтр
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const colorMatch = overlayColor.match(/\d+/g);
        const [r, g, b] = colorMatch ? colorMatch.map(Number) : [0, 0, 0];
        const overlayOpacity = 1;

        for (let i = 0; i < data.length; i += 4) {
            const originalR = data[i];
            const originalG = data[i + 1];
            const originalB = data[i + 2];

            data[i] = Math.round(originalR * (1 - overlayOpacity) + r * overlayOpacity);
            data[i + 1] = Math.round(originalG * (1 - overlayOpacity) + g * overlayOpacity);
            data[i + 2] = Math.round(originalB * (1 - overlayOpacity) + b * overlayOpacity);
        }

        ctx.putImageData(imageData, 0, 0);

        // Сохраняем оригинальные данные для стирания
        (ctx as any).originalImageData = originalImageData;
    }, [width, height, overlayColor]);

    // Получение координат
    const getCoordinates = useCallback((clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Координаты с учетом DPR
        const x = (clientX - rect.left) * (canvas.width / rect.width) / dpr;
        const y = (clientY - rect.top) * (canvas.height / rect.height) / dpr;

        return { x, y };
    }, []);

    // Стирание в точке
    const eraseAt = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const originalImageData = (ctx as any).originalImageData;
        if (!originalImageData) return;

        // Сохраняем текущее состояние
        ctx.save();

        // Создаем область стирания
        ctx.beginPath();
        ctx.arc(x, y, eraserSize, 0, Math.PI * 2);
        ctx.clip();

        // Восстанавливаем оригинальное изображение в этой области
        ctx.putImageData(originalImageData, 0, 0);

        // Восстанавливаем состояние
        ctx.restore();
    }, [eraserSize]);

    // Сброс canvas
    const handleReset = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Полностью перерисовываем canvas
        drawInitialCanvas(ctx, image);
    }, [drawInitialCanvas]);

    // Обработчики событий
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        const { x, y } = getCoordinates(e.clientX, e.clientY);
        eraseAt(x, y);
    }, [getCoordinates, eraseAt]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!isDrawing) return;
        const { x, y } = getCoordinates(e.clientX, e.clientY);
        eraseAt(x, y);
    }, [isDrawing, getCoordinates, eraseAt]);

    const handleMouseUp = useCallback(() => {
        setIsDrawing(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        const touch = e.touches[0];
        const { x, y } = getCoordinates(touch.clientX, touch.clientY);
        eraseAt(x, y);
    }, [getCoordinates, eraseAt]);

    const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const { x, y } = getCoordinates(touch.clientX, touch.clientY);
        eraseAt(x, y);
    }, [isDrawing, getCoordinates, eraseAt]);

    const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(false);
    }, []);

    // Эффект для предотвращения прокрутки
    useEffect(() => {
        const preventScroll = (e: TouchEvent) => {
            if (canvasRef.current && canvasRef.current.contains(e.target as Node)) {
                e.preventDefault();
            }
        };

        document.addEventListener('touchmove', preventScroll, { passive: false });

        return () => {
            document.removeEventListener('touchmove', preventScroll);
        };
    }, []);

    return (
        <div className="image-scratch-container">
            <div className="scratch-controls">
                <Typography.Title className='Question_Container_Card_Text' level={5} style={{ color: 'white', margin: 0 }}>
                    Ответ в рисунке
                </Typography.Title>

                <div className="stats">
                    <button
                        onClick={handleReset}
                        className="reset-button"
                        disabled={!isLoaded}
                    >
                        <Typography.Title className='Question_Container_Card_Text' level={5} style={{ color: 'white', margin: 0 }}>
                            Начать заново
                        </Typography.Title>
                    </button>
                </div>
            </div>

            <div className="canvas-wrapper">
                {!isLoaded && (
                    <div className="loading">Загрузка изображения...</div>
                )}

                <canvas
                    ref={canvasRef}
                    className="scratch-canvas"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    style={{
                        cursor: isDrawing ? 'crosshair' : 'default',
                        touchAction: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTouchCallout: 'none',
                        display: isLoaded ? 'block' : 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default ImageScratchCanvas;