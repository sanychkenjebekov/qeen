import Title from '@/pages/OneItemPage/components/Title';
import Desc from '@/pages/OneItemPage/components/Desc';
import List from '@/pages/OneItemPage/components/List';
import MainImage from '@/pages/OneItemPage/components/MainImage';
import Recommendation from '@/pages/OneItemPage/components/Recommendation';
import { useCallback, useEffect, useState } from 'react';
import { IProductDetail } from '@/pages/OneItemPage/types/IProductDetail';
import { axiosApi } from '@/app/providers/http/axiosApi';
import { useParams } from 'react-router-dom';

export const OneItemPage = () => {
    const [product, setProduct] = useState<IProductDetail | null>(null);
    const { id } = useParams();
    const [img, setImg] = useState('');
    const mainImage = `https://back.queen-shops.com${img}`;

    const fetchOneProduct = useCallback(async () => {
        try {
            const response = await axiosApi.get<IProductDetail>(
                `/products/list/one/product/${id}/`,
            );
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        void fetchOneProduct();
    }, []);

    if (!product) {
        return null;
    }

    return (
        <div key={product.id} className="sm:max-w-[620px]  lg:max-w-[1300px] mx-auto">
            <div className="lg:bg-secondary flex justify-between gap-y-[40px] py-[40px] px-[17px] my-[40px] rounded-[30px]">
                <div className="w-[636px] flex flex-col items-center">
                    <div className="lg:hidden">
                        <Title product={product} />
                    </div>
                    <div>
                        <MainImage product={product} mainImage={mainImage} />
                    </div>
                    <div>
                        <List product={product} setImg={setImg} />
                    </div>
                    <div className="lg:hidden">
                        <Desc product={product} />
                    </div>
                </div>
                <div className="md:w-[590px]">
                    <div className="hidden lg:block">
                        <Title product={product} />
                    </div>
                    <div className="hidden lg:block">
                        <Desc product={product} />
                    </div>
                </div>
            </div>
            <div>
                <Recommendation />
            </div>
        </div>
    );
};
