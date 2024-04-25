import { useEffect, useRef, useState } from 'react';
import './basket.scss';
import { IBasket } from '@/pages/Basket/types/IBasket';
import BasketCard from '@/pages/Basket/BasketCard';
import BasketForm from '@/pages/Basket/BasketForm';
import Button from '@/shared/ui/Buttons/Button';

const Basket = () => {
    const [basket, setBasket] = useState<IBasket[]>([]);
    const allCount = basket.reduce((acc, el) => acc + el.count, 0);
    const allPrice = basket.reduce((acc, el) => acc + el.price * el.count, 0);
    const allDiscount = basket.reduce((acc, el) => acc + parseFloat(el?.discount?.toString()), 0);
    const refModal = useRef<HTMLDivElement>(null);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        const storageBasket = JSON.parse(localStorage.getItem('basket') || '[]');
        setBasket(storageBasket);
    }, []);

    const deleteCard = (inx: number, color: string, size: string) => {
        const storedData = JSON.parse(localStorage.getItem('basket') || '[]') as IBasket[];
        // const delCard = storedData.filter(item => !(item.id === id && item.color === color && item.size === size));
        const delCard = storedData.filter(
            (item, i) => !(i === inx && item.color === color && item.size === size),
        );
        setBasket(() => delCard);
        localStorage.setItem('basket', JSON.stringify(delCard));
    };

    const clearBasket = () => {
        setBasket([]);
        localStorage.removeItem('basket');
        setModal(false);
    };

    useEffect(() => {
        if (modal) {
            refModal.current!.style.transform = 'translateX(0)';
        } else {
            refModal.current!.style.transform = 'translateX(100%)';
        }
    }, [modal]);

    return (
        <div id="basket">
            <div className="container w-[90%] mx-auto">
                {basket.length > 0 ? (
                    <>
                        <div className="title">
                            <div className="titleMobile flex flex-col items-center relative h-[140px]">
                                <h1 className="font-bold text-3xl my-[30px]">Корзина</h1>
                                <button
                                    onClick={() => setModal(true)}
                                    className="text-[rgba(33, 33, 33, 0.7)] bg-[#FFFFFF] rounded-[10px] w-[177px] h-[50px] text-[15px] absolute bottom-0 right-0 top-[90px]"
                                >
                                    Очистить корзину
                                </button>
                            </div>
                        </div>
                        <div className="basket mt-[30px] pt-[10px] pb-[80px] bg-[#FAF8F4] rounded-[30px]">
                            <div className="basket--main w-[90%] mx-auto">
                                <div className="basket--main__title flex justify-between items-center">
                                    <h1 className="font-bold text-3xl my-[30px]">Корзина</h1>
                                    <button
                                        onClick={() => setModal(true)}
                                        className="text-[rgba(33, 33, 33, 0.7)] bg-[#FFFFFF] rounded-[10px] w-[177px] h-[50px] text-[15px]"
                                    >
                                        Очистить корзину
                                    </button>
                                </div>
                                <div className="basket--main__all flex justify-between">
                                    <div className="basket--main__all--product border-2 border-[rgba(0, 0, 0, 0.1)] rounded-[20px]  w-[655px] h-[100%]">
                                        {basket.map((el, index) => (
                                            <BasketCard
                                                deleteCard={deleteCard}
                                                basket={el}
                                                key={index}
                                                index={index}
                                                refreshBasket={(basket: IBasket[]) =>
                                                    setBasket(basket)
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="basket--main__all--form w-[505px]">
                                        <BasketForm
                                            allCount={allCount}
                                            allPrice={allPrice}
                                            allDiscount={allDiscount}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center py-[150px] mt-[30px] bg-[#FAF8F4] rounded-[30px]">
                        <h3>Пусто</h3>
                    </div>
                )}
            </div>
            <div
                ref={refModal}
                className="fixed z-10 left-0 right-0 bottom-0 top-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] transform translate-x-full"
            >
                <div className="flex flex-col items-center justify-center bg-white rounded-[20px] py-[30px] w-[330px] sm:w-[450px]">
                    <h1 className="text-2xl font-bold text-center mt-[10px] max-sm:text-[20px]">
                        Удалить все товар из корзины ?
                    </h1>
                    <p className="w-[360px] text-center text-[20px] my-[10px]  max-sm:text-[16px]">
                        Отменить данное действие будет невозможно
                    </p>
                    <div className="flex gap-[10px]">
                        <Button
                            onClick={clearBasket}
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
        </div>
    );
};

export default Basket;
