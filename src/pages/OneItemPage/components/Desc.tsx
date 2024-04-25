/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Minus, Plus } from '@phosphor-icons/react';
import AccordionItem from '@/shared/ui/Accordionitem';
import Accordion from '@/shared/ui/Accordion';
import { useEffect, useRef, useState } from 'react';
import { IProductDetail } from '@/pages/OneItemPage/types/IProductDetail';
import img from '../../../../public/onepage-icon.svg';
import Button from '@/shared/ui/Buttons/Button';
import { Link } from 'react-router-dom';

interface IDesc {
    product: IProductDetail;
}

const Desc = ({ product }: IDesc) => {
    const [count, setCount] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [borderColor, setBorderColor] = useState(-1);
    const [borderSz, setBorderSz] = useState(-1);
    const refModal = useRef<HTMLDivElement>(null);
    const [modal, setModal] = useState(false);
    const [textModal, setTextModal] = useState('');
    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handlerColor = (el: string, inx: number) => {
        setColor(el);
        setBorderColor(inx);
    };
    const handlerSz = (sz: string, inx: number) => {
        setSize(sz);
        setBorderSz(inx);
    };

    const addBasket = () => {
        if (color !== '' && size !== '') {
            const basket = JSON.parse(localStorage.getItem('basket') || '[]');
            // @ts-ignore
            if (
                !basket.some(
                    //@ts-ignore
                    some => some.id === product.id && some.color === color && some.size === size,
                )
            ) {
                const newItem = {
                    id: product.id,
                    title: product.title,
                    size: size,
                    color: color,
                    price: product.price,
                    total: product.price * count,
                    description: product.description,
                    images1: product.images1,
                    count: count,
                    discount: product.discount,
                };
                basket.push(newItem);
                localStorage.setItem('basket', JSON.stringify(basket));
                setTextModal('Товар добавлен в корзину');
                setModal(true);
            } else {
                setTextModal('Товар уже есть в корзинке');
                setModal(true);
            }
        } else {
            alert('Выберите цвет и размер');
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
        <div>
            <div className="pt-[28px] pb-[26px] border-b border-gray-300">
                <span className="font-semibold" style={{ fontSize: '21px' }}>
                    Цвет
                </span>
                <div className="mt-[12px] flex w-[143px] gap-[12px]">
                    {product.color.map((el, inx) => (
                        <div
                            onClick={() => handlerColor(el.colors, inx)}
                            key={inx}
                            className="block w-[37px] h-[37px] relative"
                            style={{
                                backgroundColor: el.colors,
                                borderRadius: '25px',
                                cursor: 'pointer',
                                // border: borderColor === inx ? '2px solid black' : 'none',
                            }}
                        >
                            {borderColor === inx && (
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                                    ✔
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-[20px] pb-[13px] border-b border-gray-300">
                <span className="font-semibold" style={{ fontSize: '21px' }}>
                    Размер
                </span>
                <div className="flex flex-row flex-wrap justify-items-start text-center mt-[13px]">
                    {product.size.map((sz, inx) => (
                        <div
                            key={sz.id}
                            onClick={() => handlerSz(sz.sizes, inx)}
                            className="w-[100px] px-[10px] py-[10px] rounded-[10px] me-[13px] mb-[8px]"
                            style={{
                                backgroundColor: '#F3F3EB',
                                cursor: 'pointer',
                                border: borderSz === inx ? '1px solid black' : 'none',
                            }}
                        >
                            {sz.sizes}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-[22px] pb-[22px] flex flex-col border-b border-gray-300 sm:flex-row items-center flex-wrap justify-between">
                <div
                    className="ps-[20px] flex flex-row w-[140px] justify-between"
                    style={{ alignItems: 'center' }}
                >
                    <Minus size={24} onClick={decrement} className="cursor-pointer" />
                    <span style={{ fontSize: '23px' }}>{count}</span>
                    <Plus size={24} onClick={increment} className="cursor-pointer" />
                </div>
                <button
                    onClick={addBasket}
                    className="text-white mt-3 lg:mt-[20px] sm:mt-0 text-[20px] px-[120px] rounded-[10px] sm:px-[150px] py-[12px] bg-black"
                >
                    В корзину
                </button>
            </div>
            <div className="pt-[20px] border-b border-gray-300">
                <ul className="text-primary">
                    <AccordionItem info={product.characteristics} />
                </ul>
            </div>
            <div className="pt-[20px] border-b border-gray-300">
                <ul className="text-primary">
                    <Accordion desc={product.description} />
                </ul>
            </div>

            <div
                ref={refModal}
                className="fixed z-10 left-0 right-0 bottom-0 top-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] transform translate-x-full"
            >
                <div className="flex flex-col items-center justify-center bg-white rounded-[20px] py-[30px] w-[330px] sm:w-[450px]">
                    <img width={80} src={img} alt="" />
                    <h1 className="text-2xl font-bold w-[250px] text-center mt-[10px] max-sm:text-[20px]">
                        {textModal}
                    </h1>
                    <Button
                        onClick={() => setModal(false)}
                        type="button"
                        typeButton=""
                        style={
                            'border-[2px] border-black my-[15px] w-[350px] h-[52px] max-sm:w-[300px] pr-0 pl-0'
                        }
                    >
                        Продолжить покупку{' '}
                    </Button>
                    <Link to="/basket">
                        <Button
                            type="button"
                            typeButton="primary"
                            style={'w-[350px] h-[52px] max-sm:w-[300px] pr-0 pl-0'}
                        >
                            Купить сразу
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Desc;
