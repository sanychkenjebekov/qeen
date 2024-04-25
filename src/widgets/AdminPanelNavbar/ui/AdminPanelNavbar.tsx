import cls from './AdminPanelNavbar.module.scss';
import { List } from '@phosphor-icons/react';
import { useMenu } from '@/app/providers/MenuProvider/MenuProvider';

export const AdminPanelNavbar = () => {
    const pathname = window.location.href;
    const { toggleMenu } = useMenu();

    return (
        <nav className={cls.container}>
            <div className={cls.burgerWrapper}>
                <span onClick={toggleMenu} className={cls.burger}>
                    <List size={24} />
                </span>
                <div className={cls.title}>{pathname.split('/').pop()}</div>
            </div>
        </nav>
    );
};
