import cls from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { SidebarProfile } from './SidebarProfile/SidebarProfile';
import { SignOut } from '@phosphor-icons/react';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import { logout } from '@/pages/AuthPage/api/authThunk';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '@/app/providers/MenuProvider/MenuProvider';

export const Sidebar = () => {
    const { isMenuOpen } = useMenu();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandle = async () => {
        await dispatch(logout()).unwrap();
        navigate('/');
    };

    return (
        <aside className={`${isMenuOpen ? cls.open : cls.container}`}>
            <SidebarProfile />
            <SidebarItem />
            <button onClick={logoutHandle} className="flex gap-x-3">
                <SignOut size={24} /> Выйти
            </button>
        </aside>
    );
};
