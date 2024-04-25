import Slider from '../MainComponents/Slider';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '@/entities/Product/model/services/fetchProducts';
import { productsSelector } from '@/entities/Product';
import { selectUser } from '@/pages/AuthPage/model/slice/authSlice';

const RecomendationSection = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const products = useAppSelector(productsSelector);

    console.log(products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const click = () => {
        console.log(1);
    };
    return (
        <section>
            <div className="max-container">
                <h1 className="mb-[32px] text-[26px] font-semibold">Наши рекомендации</h1>
            </div>
            <Slider
                slidesPerView={1}
                spaceBetween={30}
                className="h-full relative"
                slideClassName=" h-full flex flex-col items-center gap-[16px] cursor-pointer relative"
                imageClassName="w-full h-full max-h-[310px] object-cover bg-white rounded-[20px]"
                textClassName="w-full"
                onClick={click}
                favorite={!!user}
                data={products}
                //break0={1}
                break500={2}
                break768={2}
                break1024={4}
                break1366={4}
                break2560={5}
            />
        </section>
    );
};

export default RecomendationSection;
