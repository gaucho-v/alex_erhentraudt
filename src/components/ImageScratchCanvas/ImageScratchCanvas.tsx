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
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const eraserSize = 2;
    const [devicePixelRatio, setDevicePixelRatio] = useState(1);

    // Получаем реальный pixel ratio устройства
    useEffect(() => {
        const dpr = window.devicePixelRatio || 1;
        setDevicePixelRatio(dpr);
    }, []);

    // Инициализация изображения
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;
        img.onload = () => {
            imageRef.current = img;
            setIsLoaded(true);
            drawCanvas();
        };
        img.onerror = () => {
            console.error('Failed to load image:', imageSrc);
        };
    }, [imageSrc]);

    // Функция для получения точных координат
    const getCoordinates = useCallback((clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();

        // Рассчитываем координаты с учетом масштаба canvas
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Для touch-устройств учитываем viewport offset
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        return { x, y };
    }, []);

    // Основная функция отрисовки с учетом DPR
    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Устанавливаем размеры canvas с учетом DPR
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;

        // Масштабируем canvas для CSS
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Масштабируем контекст для Retina-дисплеев
        ctx.scale(devicePixelRatio, devicePixelRatio);

        // 1. Рисуем оригинальное изображение
        ctx.drawImage(image, 0, 0, width, height);

        // 2. Применяем серый фильтр поверх изображения
        const imageData = ctx.getImageData(0, 0, width * devicePixelRatio, height * devicePixelRatio);
        const data = imageData.data;

        // Преобразуем в оттенки серого с прозрачностью
        const [r, g, b] = overlayColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
        const overlayOpacity = 1;

        for (let i = 0; i < data.length; i += 4) {
            // Смешиваем оригинальный цвет с цветом наложения
            const originalR = data[i];
            const originalG = data[i + 1];
            const originalB = data[i + 2];

            data[i] = Math.round(originalR * (1 - overlayOpacity) + r * overlayOpacity);
            data[i + 1] = Math.round(originalG * (1 - overlayOpacity) + g * overlayOpacity);
            data[i + 2] = Math.round(originalB * (1 - overlayOpacity) + b * overlayOpacity);
        }

        ctx.putImageData(imageData, 0, 0);
    }, [width, height, overlayColor, devicePixelRatio]);

    // Функция для стирания
    const eraseAt = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Сохраняем текущее состояние
        ctx.save();

        // Адаптируем размер ластика под DPR
        const scaledEraserSize = eraserSize * devicePixelRatio;

        // Создаем круглую область стирания
        ctx.beginPath();
        ctx.arc(x, y, scaledEraserSize, 0, Math.PI * 2);
        ctx.clip();

        // Отрисовываем оригинальное изображение только в области клипа
        ctx.drawImage(image, 0, 0, width, height);

        // Восстанавливаем состояние
        ctx.restore();
    }, [eraserSize, width, height, devicePixelRatio]);

    // Обработчики событий мыши
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const { x, y } = getCoordinates(e.clientX, e.clientY);
        eraseAt(x, y);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const { x, y } = getCoordinates(e.clientX, e.clientY);
        eraseAt(x, y);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Обработчики для touch-устройств (исправленные)
    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        const touch = e.touches[0];
        const { x, y } = getCoordinates(touch.clientX, touch.clientY);
        eraseAt(x, y);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const { x, y } = getCoordinates(touch.clientX, touch.clientY);
        eraseAt(x, y);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(false);
    };

    // Предотвращаем прокрутку при касании canvas
    useEffect(() => {
        const preventDefault = (e: TouchEvent) => {
            if (e.target === canvasRef.current) {
                e.preventDefault();
            }
        };

        document.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            document.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    // Сброс к исходному состоянию
    const handleReset = () => {
        drawCanvas();
    };

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

            <div className="canvas-wrapper" ref={containerRef}>
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
                        touchAction: 'none', // Предотвращаем жесты браузера
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTouchCallout: 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default ImageScratchCanvas;