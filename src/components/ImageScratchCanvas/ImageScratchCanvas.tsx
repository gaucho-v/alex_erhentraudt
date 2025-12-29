import React, { useRef, useEffect, useState, useCallback } from 'react';
import './ImageScratchCanvas.css';
import {Typography} from "antd";

interface ImageScratchCanvasProps {
    imageSrc?: string;
    width?: number;
    height?: number;
    overlayColor?: string; // Цвет затемнения
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
    const eraserSize = 1;
    const [isLoaded, setIsLoaded] = useState(false);

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

    // Основная функция отрисовки
    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Устанавливаем размеры canvas
        canvas.width = width;
        canvas.height = height;

        // 1. Рисуем оригинальное изображение
        ctx.drawImage(image, 0, 0, width, height);

        // 2. Применяем серый фильтр поверх изображения
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Преобразуем в оттенки серого с прозрачностью
        const [r, g, b] = [0, 0, 0];
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
    }, [width, height, overlayColor]);

    // Функция для стирания
    const eraseAt = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Сохраняем текущее состояние
        ctx.save();

        // Создаем круглую область стирания
        ctx.beginPath();
        ctx.arc(x, y, eraserSize, 0, Math.PI * 2);
        ctx.clip();

        // Отрисовываем оригинальное изображение только в области клипа
        ctx.drawImage(image, 0, 0, width, height);

        // Восстанавливаем состояние
        ctx.restore();

        // Вычисляем процент стертой области
    }, [eraserSize, width, height]);

    // Обработчики событий мыши
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        eraseAt(x, y);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        eraseAt(x, y);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Обработчики для touch-устройств
    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        eraseAt(x, y);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (!isDrawing) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        eraseAt(x, y);
    };

    const handleTouchEnd = () => {
        setIsDrawing(false);
    };

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

            <div className="canvas-wrapper">
                {!isLoaded && (
                    <div className="loading">Загрузка изображения...</div>
                )}

                <canvas
                    ref={canvasRef}
                    className="scratch-canvas"
                    width={width}
                    height={height}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ cursor: isDrawing ? 'crosshair' : 'default' }}
                />
            </div>
        </div>
    );
};

export default ImageScratchCanvas;