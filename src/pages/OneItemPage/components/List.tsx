/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { IProductDetail } from '@/pages/OneItemPage/types/IProductDetail';

interface IList {
    product: IProductDetail;
    setImg: any;
}
const List = ({ product, setImg }: IList) => {
    return (
        <div
            className="max-w-[630px] flex flex-row justify-between mt-[40px] gap-[10px]"
            style={{ alignItems: 'center' }}
        >
            <ArrowLeft size={30} />
            <img
                onClick={() => setImg(product.images1)}
                src={`https://back.queen-shops.com${product.images1}`}
                alt="item"
                className="w-[80px] h-[80px]  sm:w-[112px] sm:h-[112px] rounded-[8px] cursor-pointer"
            />
            {product?.images2 ? (
                <img
                    onClick={() => setImg(product.images2)}
                    src={`https://back.queen-shops.com${product.images2}`}
                    alt="item"
                    className="w-[80px] h-[80px] sm:w-[112px] sm:h-[112px] rounded-[8px] cursor-pointer"
                />
            ) : null}
            {product?.images3 ? (
                <img
                    onClick={() => setImg(product.images3)}
                    src={`https://back.queen-shops.com${product.images3}`}
                    alt="item"
                    className="w-[80px] h-[80px] sm:w-[112px] sm:h-[112px] rounded-[8px] cursor-pointer"
                />
            ) : null}
            <ArrowRight size={30} />
        </div>
    );
};

export default List;
