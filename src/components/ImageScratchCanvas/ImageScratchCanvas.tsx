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
    const [devicePixelRatio, setDevicePixelRatio] = useState(1);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Получаем реальный pixel ratio устройства
    useEffect(() => {
        const dpr = window.devicePixelRatio || 1;
        setDevicePixelRatio(dpr);
    }, []);

    // Инициализация изображения и canvas
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            imageRef.current = img;
            setIsLoaded(true);
            initCanvas();
        };

        img.onerror = () => {
            console.error('Failed to load image:', imageSrc);
        };
    }, [imageSrc]);

    // Инициализация canvas
    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Устанавливаем размеры canvas с учетом DPR
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;

        // Масштабируем canvas для CSS
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Масштабируем контекст для Retina-дисплеев
        context.scale(devicePixelRatio, devicePixelRatio);

        setCtx(context);
        setIsInitialized(true);

        // Начальная отрисовка
        drawOverlay(context);
    }, [width, height, devicePixelRatio, overlayColor]);

    // Функция отрисовки наложения
    const drawOverlay = useCallback((context: CanvasRenderingContext2D) => {
        const image = imageRef.current;
        if (!image || !context) return;

        // 1. Рисуем оригинальное изображение
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        // 2. Применяем цветной фильтр поверх изображения
        const imageData = context.getImageData(0, 0, width * devicePixelRatio, height * devicePixelRatio);
        const data = imageData.data;

        // Парсим цвет наложения
        const colorMatch = overlayColor.match(/\d+/g);
        const [r, g, b] = colorMatch ? colorMatch.map(Number) : [0, 0, 0];
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

        context.putImageData(imageData, 0, 0);
    }, [width, height, overlayColor, devicePixelRatio]);

    // Функция для получения точных координат
    const getCoordinates = useCallback((clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();

        // Рассчитываем координаты с учетом масштаба canvas
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Для touch-устройств учитываем viewport offset
        const x = (clientX - rect.left) * scaleX / devicePixelRatio;
        const y = (clientY - rect.top) * scaleY / devicePixelRatio;

        return { x, y };
    }, [devicePixelRatio]);

    // Функция для стирания
    const eraseAt = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        const context = ctx;

        if (!canvas || !image || !context) return;

        // Сохраняем текущее состояние
        context.save();

        // Создаем круглую область стирания
        context.beginPath();
        context.arc(x, y, eraserSize, 0, Math.PI * 2);
        context.clip();

        // Отрисовываем оригинальное изображение только в области клипа
        context.drawImage(image, 0, 0, width, height);

        // Восстанавливаем состояние
        context.restore();
    }, [ctx, eraserSize, width, height]);

    // Обработчики событий мыши
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        const { x, y } = getCoordinates(e.clientX, e.clientY);
        eraseAt(x, y);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!isDrawing || !isInitialized) return;
        const { x, y } = getCoordinates(e.clientX, e.clientY);
        eraseAt(x, y);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Обработчики для touch-устройств
    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        const touch = e.touches[0];
        const { x, y } = getCoordinates(touch.clientX, touch.clientY);
        eraseAt(x, y);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!isDrawing || !isInitialized) return;
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
        if (ctx && isInitialized) {
            drawOverlay(ctx);
        }
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