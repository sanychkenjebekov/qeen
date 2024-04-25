import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import Loader from '@/shared/ui/Loader/Loader';
import {
    changeStatusOrder,
    getOrders,
} from '@/pages/AdminPanelPages/AdminPanelOrders/api/OrdersThunk';
import {
    selectOrdersAdmin,
    selectOrdersAdminLoading,
} from '@/pages/AdminPanelPages/AdminPanelOrders/model/slice/OrdersSlice';
import { Link } from 'react-router-dom';
import { ArrowRight, Pencil } from '@phosphor-icons/react';

export const AdminPanelOrders = () => {
    const orders = useAppSelector(selectOrdersAdmin);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectOrdersAdminLoading);
    const [changeStatus, setChangeStatus] = useState(false);
    const [status, setStatus] = useState('');
    const [selectId, setSelectId] = useState(0);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const statusRender = (status: string) => {
        if (status === 'Оплачено') {
            return (
                <p className="text-[#71AC02] rounded-[10px] px-[16px] text-[13px] font-semibold py-[12px] bg-[#EBFACF]">
                    {status}
                </p>
            );
        } else if (status === 'На проверке') {
            return (
                <p className="text-[#AC9B02] rounded-[10px] px-[16px] text-[13px] font-semibold py-[12px] bg-[#FAF8CF]">
                    {status}
                </p>
            );
        } else if (status === 'Доставлено') {
            return (
                <p className="text-[#0246AC] rounded-[10px] px-[16px] text-[13px] font-semibold py-[12px] bg-[#CFE0FA]">
                    {status}
                </p>
            );
        }
    };

    const handleSelectOrder = (id: number) => {
        setSelectId(id);
        setChangeStatus(!changeStatus);
    };

    const saveStatus = async (id: number) => {
        await dispatch(changeStatusOrder({ id, status }));
        await dispatch(getOrders());
        setSelectId(0);
        setChangeStatus(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="col-span-4 md:col-span-3 container mx-auto">
            {orders.length !== 0 ? (
                orders.map(order => (
                    <div
                        key={order.id}
                        className="flex flex-col gap-y-[24px] border-b border-b-thirsty pb-[32px] my-3"
                    >
                        <div className="flex items-center gap-x-[24px] justify-between md:justify-normal">
                            <h4 className="font-semibold text-primary">Заказ {order.id}</h4>
                            {selectId === order.id && changeStatus ? (
                                <select
                                    className="text-black outline-0 rounded-[10px] px-[16px] text-[13px] font-semibold py-[12px] bg-[#FAF8CF]"
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                                        setStatus(event.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    <option value="На проверке">На проверке</option>
                                    <option value="Оплачено">Оплачено</option>
                                    <option value="Доставлено">Доставлено</option>
                                </select>
                            ) : (
                                statusRender(order.status)
                            )}
                            {selectId === order.id && changeStatus ? (
                                <button
                                    className="text-[#71AC02] rounded-[10px] px-[16px] text-[13px] font-semibold py-[12px] bg-[#EBFACF]"
                                    onClick={() => saveStatus(order.id)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="text-[#71AC02] rounded-[10px] px-[16px] text-[13px] font-semibold py-[12px] bg-[#EBFACF]"
                                    onClick={() => handleSelectOrder(order.id)}
                                >
                                    <Pencil size={22} />
                                </button>
                            )}
                        </div>
                        <div className="flex gap-x-[18px] flex-wrap gap-y-[10px]">
                            {order.products.map(product => {
                                if (order.products.length <= 4) {
                                    return (
                                        <img
                                            key={product.id}
                                            className="bg-secondary border border-thirsty w-[65px] max-h-[65px] md:max-h-max md:w-[124px] rounded-[5px] md:rounded-[25px]"
                                            src={'http://3.123.17.71/' + product.images1}
                                            alt="item"
                                        />
                                    );
                                }
                            })}
                            {order.products.length > 4 ? (
                                <div className="flex text-center items-center justify-center bg-secondary border border-thirsty w-[65px] max-h-[65px] md:max-h-max md:w-[124px] rounded-[5px] md:rounded-[25px] p-[32px]">
                                    <p className="font-semibold text-thirsty text-[31px] md:text-[50px]">
                                        +{order.products.length - 4}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col gap-y-[12px]">
                            <p className="text-[16px] font-normal">
                                Пользователь: {order.user.email}
                            </p>
                            <p className="text-[16px] font-normal">
                                Адрес доставки: {order.location}
                            </p>
                            <p className="text-[16px] font-normal">Оплата: {order.types}</p>
                        </div>
                        <Link
                            className="text-primary font-medium flex gap-x-3 items-center"
                            to={`/orders/${order.id}`}
                        >
                            Детали заказа <ArrowRight size={18} />
                        </Link>
                    </div>
                ))
            ) : (
                <h2 className="text-center">Пусто</h2>
            )}
        </div>
    );
};
