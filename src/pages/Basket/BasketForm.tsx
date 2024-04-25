import InputField from '@/shared/ui/Inputs/InputField';
import Button from '@/shared/ui/Buttons/Button';
import { IBasket } from '@/pages/Basket/types/IBasket';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { OrderData, OrderMutation, OrderMutationBtn } from '@/pages/Basket/types/Order';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import { createOrder } from '@/pages/Basket/api/basketThunk';
import { Link } from 'react-router-dom';

interface Props {
    allCount: number;
    allPrice: number;
    allDiscount: number;
}

const BasketForm: React.FC<Props> = ({ allCount, allPrice, allDiscount }) => {
    const [state, setState] = useState<OrderMutation>({
        firstname: '',
        lastname: '',
        location: '',
    });

    const [btn, setBtn] = useState<OrderMutationBtn>({
        delivery: '',
        city: '',
        bank: '',
        nal: '',
        terminal: '',
    });

    const [fieldFirstname, setFieldFirstname] = useState('defoult');
    const [fieldLastname, setFieldLastname] = useState('defoult');
    const [fieldLocation, setFieldLocation] = useState('defoult');
    const [deliverType, setDeliverType] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const refModal = useRef<HTMLDivElement>(null);
    const refErr = useRef<HTMLDivElement>(null);
    const [modal, setModal] = useState(false);
    const dispatch = useAppDispatch();

    const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validationForm = () => {
        if (state.firstname.trim() === '') {
            setFieldFirstname('error');
        } else {
            setFieldFirstname('defoult');
        }
        if (state.lastname.trim() === '') {
            setFieldLastname('error');
        } else {
            setFieldLastname('defoult');
        }
        if (state.location.trim() === '') {
            setFieldLocation('error');
        } else {
            setFieldLocation('defoult');
        }

        if (btn.delivery === '' && btn.city === '') {
            setBtn(prevState => ({
                ...prevState,
                delivery: 'error',
                city: 'error',
            }));
        }
        if (btn.bank === '' && btn.nal === '' && btn.terminal === '') {
            setBtn(prevState => ({
                ...prevState,
                bank: 'error',
                nal: 'error',
                terminal: 'error',
            }));
        }
    };

    const clickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.textContent === 'Бесплатная доставка') {
            setDeliverType(event.currentTarget.textContent);
            setBtn(prevState => ({
                ...prevState,
                delivery: 'contained',
                city: '',
            }));
        }
        if (event.currentTarget.textContent === 'По Бишкеку - 200 сом') {
            setDeliverType(event.currentTarget.textContent);
            setBtn(prevState => ({
                ...prevState,
                city: 'contained',
                delivery: '',
            }));
        }
        if (event.currentTarget.textContent === 'Банковский перевод') {
            setPaymentType(event.currentTarget.textContent);
            setBtn(prevState => ({
                ...prevState,
                bank: 'contained',
                nal: '',
                terminal: '',
            }));
        }
        if (event.currentTarget.textContent === 'Наличными курьеру') {
            setPaymentType(event.currentTarget.textContent);
            setBtn(prevState => ({
                ...prevState,
                nal: 'contained',
                bank: '',
                terminal: '',
            }));
        }
        if (event.currentTarget.textContent === 'Через терминал') {
            setPaymentType(event.currentTarget.textContent);
            setBtn(prevState => ({
                ...prevState,
                nal: '',
                bank: '',
                terminal: 'contained',
            }));
        }
    };

    const addProduct = async (event: FormEvent) => {
        event.preventDefault();
        validationForm();
        const v = btn.delivery !== '' || btn.city !== '';
        const v2 = btn.delivery !== 'error' || (btn.city !== 'error' && v);
        const v3 = btn.bank !== '' || btn.nal !== '' || btn.terminal !== '';
        const v4 = btn.bank !== 'error' || btn.nal !== 'error' || (btn.terminal !== 'error' && v3);
        if (
            state.firstname.trim() !== '' &&
            state.lastname.trim() !== '' &&
            state.location.trim() !== '' &&
            v2 &&
            v4
        ) {
            const products = JSON.parse(localStorage.getItem('basket') || '[]') as IBasket[];
            const productsIds = products.map(product => {
                return product.id;
            });
            const priceOrder = products.reduce((price, product) => {
                return price + product.price * product.count;
            }, 0);
            const order: OrderData = {
                products: productsIds,
                price: priceOrder,
                ...state,
                paymentType,
                deliver: {
                    type: deliverType,
                    location: state.location,
                },
            };
            await dispatch(createOrder(order));
            setModal(true);
            setState({
                firstname: '',
                lastname: '',
                location: '',
            });
            setBtn({
                delivery: '',
                city: '',
                bank: '',
                nal: '',
                terminal: '',
            });
            refErr.current!.style.display = 'none';
        } else {
            refErr.current!.style.display = 'block';
        }
    };

    useEffect(() => {
        if (modal) {
            refModal.current!.style.transform = 'translateX(0)';
        } else {
            refModal.current!.style.transform = 'translateX(100%)';
        }
    }, [modal]);

    return (
        <>
            <div className="basket--main__all--form__result flex justify-between">
                <div className="basket--main__all--form__result--discount my-[15px]">
                    <h1 className="text-[#212121] text-[24px] font-semibold">Скидка</h1>
                    <p className="text-[#BF2025] text-[28px] font-medium">
                        {allDiscount ? -allDiscount + ' сом' : 0}
                    </p>
                </div>
                <div className="basket--main__all--form__result--price">
                    <h1 className="text-[#212121] text-[24px] font-semibold">Итого</h1>
                    <h2 className="text-[#212121] text-[24px] font-medium w-[150px]">
                        {allPrice - allDiscount} сом
                    </h2>
                </div>
            </div>
            <div className="basket--main__all--form__quantity border-solid border-b-2 border-[rgba(0, 0, 0, 0.1)]">
                <div className="basket--main__all--form__quantity--one flex items-center justify-between">
                    <h1 className="text-[#212121] text-[20px] font-semibold">Количество товаров</h1>
                    <h1 className="text-[#212121] text-[20px] font-semibold">{allCount}</h1>
                </div>
                <div className="basket--main__all--form__quantity--two flex items-center justify-between my-[10px]">
                    <h1 className="text-[#212121] text-[20px] font-semibold">Сумма без скидок</h1>
                    <h1 className="text-[#212121] text-[20px] font-semibold">{allPrice}</h1>
                </div>
            </div>
            <form onSubmit={addProduct}>
                <div className="basket--main__all--form__dostavka flex flex-col items-center">
                    <div className="basket--main__all--form__dostavk--i w-[100%] flex flex-col gap-[15px] mt-[15px]">
                        <InputField
                            placeholder="Имя"
                            typeField={fieldFirstname}
                            name="firstname"
                            type="text"
                            value={state.firstname}
                            onChange={changeFields}
                            key={'1'}
                            style="w-full"
                        />
                        <InputField
                            placeholder="Фамилия"
                            typeField={fieldLastname}
                            name="lastname"
                            type="text"
                            value={state.lastname}
                            onChange={changeFields}
                            key={'2'}
                            style="w-full"
                        />
                    </div>
                    <div className="basket--main__all--form__dostavka--card text-center">
                        <h1 className="text-[#212121] text-[20px] font-semibold my-[20px]">
                            Доставка
                        </h1>
                        <InputField
                            placeholder="Адрес"
                            typeField={fieldLocation}
                            type="text"
                            name="location"
                            value={state.location}
                            onChange={changeFields}
                            key={'1'}
                            style="w-full"
                        />
                        <Button
                            onClick={clickBtn}
                            type="button"
                            typeButton={btn.delivery}
                            style="bg-[#FFFFFF] rounded-[10px] text-[16px] text-[#212121] w-[100%] h-[54px] mt-[15px]"
                        >
                            Бесплатная доставка
                        </Button>
                        <Button
                            onClick={clickBtn}
                            type="button"
                            typeButton={btn.city}
                            style="bg-[#FFFFFF] rounded-[10px] text-[16px] text-[#212121] w-[100%] h-[54px] my-[15px]"
                        >
                            По Бишкеку - 200 сом
                        </Button>
                        <h1 className="text-[#212121] text-[20px] font-semibold">Оплата</h1>
                        <Button
                            onClick={clickBtn}
                            type="button"
                            typeButton={btn.terminal}
                            style="bg-[#FFFFFF] rounded-[10px] text-[16px] text-[#212121] w-[100%] h-[54px] mt-[20px]"
                        >
                            Через терминал
                        </Button>
                        <Button
                            onClick={clickBtn}
                            type="button"
                            typeButton={btn.bank}
                            style="bg-[#FFFFFF] rounded-[10px] text-[16px] text-[#212121] w-[100%] h-[54px] my-[15px]"
                        >
                            Банковский перевод
                        </Button>
                        <Button
                            onClick={clickBtn}
                            type="button"
                            typeButton={btn.nal}
                            style="bg-[#FFFFFF] rounded-[10px] text-[16px] text-[#212121] w-[100%] h-[54px] mb-[20px]"
                        >
                            Наличными курьеру
                        </Button>
                        <Button
                            type="submit"
                            typeButton="primary"
                            style="w-full font-semibold text-[20px]"
                        >
                            Оформить заказ
                        </Button>
                        <h3
                            ref={refErr}
                            className="hidden text-[18px] font-semibold text-[#bf2025] mt-[20px]"
                        >
                            Заполните все поля !
                        </h3>
                    </div>
                </div>
            </form>
            <div
                ref={refModal}
                className="fixed z-10 left-0 right-0 bottom-0 top-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] transform translate-x-full"
            >
                <div className="flex flex-col items-center justify-center bg-white rounded-[20px] py-[30px] w-[450px]">
                    <h1 className="text-2xl font-bold text-center mt-[10px]">
                        Ваш заказ на рассмотрении
                    </h1>
                    <p className="w-[360px] text-center text-[20px] my-[10px]">
                        Для оформления заказа Вам надо скинуть чек с оплатой по номеру +996 500 20
                        00 20
                    </p>
                    <Link onClick={() => setModal(false)} to="/">
                        <Button type="button" typeButton="primary" style={'w-[350px] h-[52px]'}>
                            На главную
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BasketForm;
