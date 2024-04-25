import { Link, RouteProps, useLocation } from 'react-router-dom';
import cls from './MenuLink.module.scss';
import React, { FC, ReactNode } from 'react';

interface MenuLinkProps {
    href: RouteProps;
    label: string;
    icon: ReactNode;
}

const MenuLink: FC<MenuLinkProps> = ({ href, label, icon }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const hrefName = (href && href.path) || '/';
    const linkHref = typeof href === 'string' ? href : (href && href.path) || '/';

    return (
        <Link
            to={linkHref}
            className={`${cls.container} ${pathname === hrefName ? cls.active : ''}`}
        >
            <span className="text-xl font-regular">{icon}</span>
            <span>{label}</span>
        </Link>
    );
};

export default React.memo(MenuLink);
