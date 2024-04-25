import MenuLink from '@/shared/ui/MenuLink/MenuLink';
import cls from '../Sidebar.module.scss';
import { menuItems } from '../constants/sidebar.constants';

export const SidebarItem = () => {
    return (
        <ul>
            {menuItems.map((el, index) => (
                <li className={`${cls.link}`} key={index + 1}>
                    <span>
                        <MenuLink href={el.href} label={el.label} icon={el.icon} />
                    </span>
                </li>
            ))}
        </ul>
    );
};
