import { Link } from 'react-router-dom';
import React from 'react';
import { BurgerMenuModel } from '@/widgets/BurgerMenu/model';

export const BurgerMenu: React.FC<BurgerMenuModel> = ({ onClose }) => {
    return (
        <div className="flexColCenter w-full bg-secondary p-[12px] gap-y-[10px] rounded-[15px]">
            <Link
                to="/"
                onClick={onClose}
                className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
            >
                <p className="text-[16px] font-semibold text-primary">Каталог</p>
            </Link>
            <Link
                to="/"
                onClick={onClose}
                className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
            >
                <p className="text-[16px] font-semibold text-primary">Главная</p>
            </Link>
            <Link
                to="/faq"
                onClick={onClose}
                className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
            >
                <p className="text-[16px] font-semibold text-primary">Доставка</p>
            </Link>
            <Link
                to="/faq"
                onClick={onClose}
                className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
            >
                <p className="text-[16px] font-semibold text-primary">Оплата</p>
            </Link>
            <Link
                to="/faq"
                onClick={onClose}
                className="flex w-full gap-x-[16px] bg-[#F1F1F1] py-[14px] px-[24px] rounded-[10px] hover:bg-thirsty"
            >
                <p className="text-[16px] font-semibold text-primary">О нас</p>
            </Link>
        </div>
    );
};
