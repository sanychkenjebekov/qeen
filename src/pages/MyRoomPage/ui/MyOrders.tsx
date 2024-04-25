import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { selectOrders, selectOrdersLoading } from '@/pages/MyRoomPage/model/slice/PersonalSlice';
import { useEffect } from 'react';
import { getOrders } from '@/pages/MyRoomPage/api/personalThunk';
import Loader from '@/shared/ui/Loader/Loader';

const MyOrders = () => {
    const orders = useAppSelector(selectOrders);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectOrdersLoading);

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

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="col-span-4 md:col-span-3">
            {orders.length !== 0 ? (
                orders.map(order => (
                    <div
                        key={order.id}
                        className="flex flex-col gap-y-[24px] border-b border-b-thirsty pb-[32px]"
                    >
                        <div className="flex items-center gap-x-[24px] justify-between md:justify-normal">
                            <h4 className="font-semibold text-primary">Заказ {order.id}</h4>
                            {statusRender(order.status)}
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

export default MyOrders;
