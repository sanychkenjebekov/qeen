import React, { PropsWithChildren, memo, useEffect } from 'react';

interface Props extends PropsWithChildren {
    onClick?: () => void;
    className?: string;
    isVisible?: boolean;
    setIsVisible?: (isVisible: boolean) => void;
}

const Modal: React.FC<Props> = memo(({ children, className, isVisible, setIsVisible }) => {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const toggleModal = () => {
        document.body.style.overflow = 'scroll';
        setIsVisible && setIsVisible(!isVisible);
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return isVisible ? (
        <div
            onClick={toggleModal}
            className="flex items-center justify-center absolute inset-0 w-full h-full px-[20px] bg-black bg-opacity-50 z-10"
        >
            <div className={className} onClick={handleContainerClick}>
                {children}
            </div>
        </div>
    ) : null;
});

export default Modal;
