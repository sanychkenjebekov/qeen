import React, { useEffect, useRef, useState } from 'react';
import { Trash } from '@phosphor-icons/react';
import { IBasket } from '@/pages/Basket/types/IBasket';
import Button from '@/shared/ui/Buttons/Button';

interface Props {
    basket: IBasket;
    deleteCard: (inx: number, color: string, size: string) => void;
    refreshBasket: (basket: IBasket[]) => void;
    index: number;
}

const BasketCard: React.FC<Props> = ({ basket, deleteCard, refreshBasket, index }) => {
    const [count, setCount] = useState(basket.count);
    const [price, setPrice] = useState(basket.total);
    const refModal = useRef<HTMLDivElement>(null);
    const [modal, setModal] = useState(false);

    const increment = () => {
        setCount(prev => prev + 1);
        setPrice(prevPrice => prevPrice + basket.price);
        updateStorage(count + 1, price + basket.price);
    };

    const decrement = () => {
        setCount(prev => (prev !== 1 ? prev - 1 : 1));
        setPrice(prevPrice =>
            prevPrice !== basket.price ? prevPrice - basket.price : basket.price,
        );
        updateStorage(
            count !== 1 ? count - 1 : 1,
            price !== basket.price ? price - basket.price : basket.price,
        );
    };

    const oneDelete = () => {
        window.location.reload();
        deleteCard(index, basket.color, basket.size);
        setModal(false);
    };

    function updateStorage(newCount: number, newPrice: number) {
        const storedData = JSON.parse(localStorage.getItem('basket') || '[]') as IBasket[];
        const updatedStorage = storedData.map(item => {
            if (item.id === basket.id && item.color === basket.color && item.size === basket.size) {
                return {
                    ...item,
                    count: newCount,
                    total: newPrice,
                };
            }
            return item;
        });
        localStorage.setItem('basket', JSON.stringify(updatedStorage));
        refreshBasket(updatedStorage);
    }

    useEffect(() => {
        if (modal) {
            refModal.current!.style.transform = 'translateX(0)';
        } else {
            refModal.current!.style.transform = 'translateX(100%)';
        }
    }, [modal]);

    return (
        <>
            <div
                className="basket--main__all--product__card flex rounded-t-[20px] m-[15px] mb-[-1.5px] border-b-2
        border-[rgba(0, 0, 0, 0.1)] justify-between"
            >
                <img
                    className="w-[125px] h-[125px] rounded-[12.5px]"
                    src={`https://back.queen-shops.com${basket.images1}`}
                    alt=""
                />
                <div className="basket--main__all--product__card--data">
                    <h1 className="text-[20px] font-semibold text-[rgba(33, 33, 33, 1)]">
                        {basket.title}
                    </h1>
                    <p className="text-[16px] text-[rgba(33, 33, 33, 1)] my-[2px]">
                        Размер {basket.size}
                    </p>
                    <p className="text-[16px] text-[rgba(33, 33, 33, 1)] ">Цвет: {basket.color}</p>
                    <h3 className="text-[18px] text-[rgba(33, 33, 33, 1)] font-medium my-[3px]">
                        {basket.price} сом
                    </h3>
                    <p className="text-[16px] text-[rgba(33, 33, 33, 1)] mb-[15px]">
                        На складе, доставим в течении дня
                    </p>
                    <div className="basket--main__all--product__card--data__count flex gap-[10px] items-center mb-[20px] justify-end">
                        <button
                            className="text-[rgba(33, 33, 33, 1)] bg-[#F1F1F1] rounded-[50%] w-[36px] h-[36px] text-center font-medium text-[20px]"
                            onClick={decrement}
                        >
                            -
                        </button>
                        <h2 className="text-[rgba(33, 33, 33, 1)] font-medium text-[20px] w-[20px] text-center">
                            {count}
                        </h2>
                        <button
                            className="text-[rgba(33, 33, 33, 1)] font-medium text-[20px] bg-[#F1F1F1] rounded-[50%] w-[36px] h-[36px] text-center"
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div
                    className="basket--main__all--product__card--count flex
                                    flex-col items-end justify-between mr-[20px] mb-[20px] ml-0"
                >
                    <Trash
                        onClick={() => setModal(true)}
                        size={25}
                        className="trash text-[#BF2025] cursor-pointer"
                    />
                    <div className="basket--main__all--product__card--count__btn flex gap-[10px] items-center">
                        <button
                            className="text-[rgba(33, 33, 33, 1)] font-medium text-[20px]"
                            onClick={decrement}
                        >
                            -
                        </button>
                        <h2 className="text-[rgba(33, 33, 33, 1)] font-medium text-[20px] w-[20px] text-center">
                            {count}
                        </h2>
                        <button
                            className="text-[rgba(33, 33, 33, 1)] font-medium text-[20px]"
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={refModal}
                className="fixed z-10 left-0 right-0 bottom-0 top-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] transform translate-x-full"
            >
                <div className="flex flex-col items-center justify-center bg-white rounded-[20px] py-[30px] w-[330px] sm:w-[450px]">
                    <h1 className="text-2xl font-bold text-center mt-[10px] max-sm:text-[20px]">
                        Удалить товар из корзины ?
                    </h1>
                    <p className="w-[360px] text-center text-[20px] my-[10px]  max-sm:text-[16px]">
                        Отменить данное действие будет невозможно
                    </p>
                    <div className="flex gap-[10px]">
                        <Button
                            onClick={oneDelete}
                            type="button"
                            typeButton=""
                            style={
                                'w-[150px] text-red font-semibold h-[52px] border-[2px] border-red pl-0 pr-0 max-sm:text-[14px] max-sm:w-[130px]'
                            }
                        >
                            Удалить
                        </Button>
                        <Button
                            onClick={() => setModal(false)}
                            type="button"
                            typeButton="primary"
                            style={
                                'w-[150px] h-[52px] font-semibold pl-0 pr-0 max-sm:text-[14px] max-sm:w-[130px]'
                            }
                        >
                            Оставить
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketCard;
