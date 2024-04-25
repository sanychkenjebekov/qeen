import React, { memo } from 'react';

interface MenuProviderProps {
    children: React.ReactNode;
}

const MenuContext = React.createContext<{
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}>({
    isMenuOpen: false,
    toggleMenu: () => {},
    closeMenu: () => {},
});

export const MenuProvider: React.FC<MenuProviderProps> = memo(({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
});

export const useMenu = () => {
    const context = React.useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};
