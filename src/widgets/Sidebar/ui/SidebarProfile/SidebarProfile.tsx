import { ArrowLeft, User } from '@phosphor-icons/react';
import cls from './SidebarProfile.module.scss';
import { useMenu } from '@/app/providers/MenuProvider/MenuProvider';

export const SidebarProfile = () => {
    const { toggleMenu } = useMenu();
    return (
        <div className={cls.user}>
            <User size={24} />
            <div className={cls.userDetail}>
                <span className={cls.username}>Admin</span>
                <span className={cls.userTitle}>Administrator</span>
            </div>
            <div onClick={toggleMenu} className={cls.arrow}>
                <ArrowLeft size={24} />
            </div>
        </div>
    );
};
