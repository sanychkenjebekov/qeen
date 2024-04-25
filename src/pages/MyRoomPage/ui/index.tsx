import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import MyFavoritesItem from '@/pages/MyRoomPage/ui/MyFavoritesItem';
import MyOrders from '@/pages/MyRoomPage/ui/MyOrders';
import MyPersonData from '@/pages/MyRoomPage/ui/MyPersonData';
import Payment from '@/pages/MyRoomPage/ui/Payment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { createFavourite } from '@/pages/MyRoomPage/api/personalThunk';
import { selectUser } from '@/pages/AuthPage/model/slice/authSlice';

export const MyRoomPage = () => {
    const [active, setActive] = useState('1');
    const [activeChange, setActiveChange] = useState(false);
    const user = useAppSelector(selectUser);
    const location = useLocation();
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const categories = [
        {
            id: '1',
            name: 'Мои данные',
        },
        {
            id: '2',
            name: 'Заказы',
        },
        {
            id: '3',
            name: 'Избранное',
        },
        {
            id: '4',
            name: 'Способы оплаты',
        },
    ];

    useEffect(() => {
        if (location.hash[1] === '3') {
            setActive(location.hash[1]);
        }
    }, [location.hash]);

    useEffect(() => {
        if (user?.is_staff) {
            navigate('/admin_panel_products');
        }
    }, [user]);

    const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setActive(value);
    };

    return (
        <div className="w-[95%] md:container mx-auto">
            <div className="mt-[123px] rounded-[5px] p-[12px] bg-secondary md:hidden">
                <select
                    className="w-full bg-inherit outline-0"
                    onChange={selectChange}
                    name="category"
                    id="category"
                >
                    {categories.map(category => (
                        <option
                            className="font-medium text-primary text-opacity-70 text-[16px]"
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-secondary flex flex-col py-[40px] px-[50px] rounded-[30px] mt-[30px] md:mt-[123px] gap-y-[40px]">
                <div className="flex justify-end md:justify-between items-center">
                    <h2 className="font-semibold text-[32px] uppercase hidden md:block">
                        личный кабинет
                    </h2>
                    {/*<button onClick={() => dispatch(createFavourite(2))}>heh</button>*/}
                    {active === '1' ? (
                        <button
                            onClick={() => setActiveChange(prevState => !prevState)}
                            className="p-[16px] bg-white rounded-[10px]"
                        >
                            Редактировать данные
                        </button>
                    ) : null}
                </div>
                <div className="grid grid-cols-4">
                    {!activeChange ? (
                        <div className="hidden md:col-span-1 md:block">
                            <ul>
                                {categories.map(category => (
                                    <li
                                        key={category.id}
                                        onClick={() => setActive(category.id)}
                                        className={`text-[20px] text-primary ${active === category.id ? 'font-semibold' : 'font-normal'}`}
                                    >
                                        <a href="#">{category.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                    {active === '1' ? (
                        <MyPersonData
                            activeChange={activeChange}
                            activeChangeMode={() => setActiveChange(false)}
                        />
                    ) : active === '2' ? (
                        <MyOrders />
                    ) : active === '3' ? (
                        <MyFavoritesItem />
                    ) : (
                        <Payment />
                    )}
                </div>
            </div>
        </div>
    );
};
