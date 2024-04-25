import { Link, useNavigate } from 'react-router-dom';
import { House, SignIn, SignOut, User } from '@phosphor-icons/react';
import React from 'react';
import { UserPanelModel } from '@/widgets/UserPanel/model';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { selectUser } from '@/pages/AuthPage/model/slice/authSlice';
import { logout } from '@/pages/AuthPage/api/authThunk';

export const UserPanel: React.FC<UserPanelModel> = ({ onClose }) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandle = async () => {
        await dispatch(logout()).unwrap();
        navigate('/login');
        void onClose;
    };

    return (
        <div className="flexColCenter w-full bg-secondary p-[12px] gap-y-[10px] rounded-[15px]">
            {!user ? (
                <>
                    <Link
                        to="/register"
                        onClick={onClose}
                        className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
                    >
                        <User className="text-primary" size={24} />
                        <p className="text-[16px] font-semibold text-primary">Регистрация</p>
                    </Link>
                    <Link
                        to="/login"
                        onClick={onClose}
                        className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
                    >
                        <SignIn className="text-primary" size={24} />
                        <p className="text-[16px] font-semibold text-primary">Вход</p>
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/my-room"
                        onClick={onClose}
                        className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
                    >
                        <House className="text-primary" size={24} />
                        <p className="text-[16px] font-semibold text-primary">Мой кабинет</p>
                    </Link>
                    <button
                        onClick={logoutHandle}
                        className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
                    >
                        <SignOut size={24} className="text-red" />
                        <p className="text-[16px] font-semibold text-red">Выйти из аккаунта</p>
                    </button>
                </>
            )}
        </div>
    );
};
