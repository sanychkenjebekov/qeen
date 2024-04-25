import { IProductDetail } from '@/pages/OneItemPage/types/IProductDetail';

interface ITitle {
    product: IProductDetail;
}
const Title = ({ product }: ITitle) => {
    return (
        <div className="pb-[27px] text-center sm:text-left border-0 lg:border-b lg:border-gray-300">
            <h3 className="uppercase font-bold text-xl sm:text-3xl">{product.title}</h3>
            <span className="uppercase font-bold text-xl sm:text-3xl">{product.price} сом</span>
        </div>
    );
};

export default Title;
