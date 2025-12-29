import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 756) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

        // Инициализация значения
        setIsMobile(mediaQuery.matches);

        // Обработчик изменения
        const handleChange = (event: any) => {
            setIsMobile(event.matches);
        };

        // Добавляем слушатель (современный метод с addEventListener)
        mediaQuery.addEventListener('change', handleChange);

        // Очистка
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [breakpoint]);

    return isMobile;
};