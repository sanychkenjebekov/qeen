// import { Heart } from '@phosphor-icons/react';
// import { useState } from 'react';
import { IProductDetail } from '@/pages/OneItemPage/types/IProductDetail';
// import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';

interface IMainImg {
    product: IProductDetail;
    mainImage: string;
}
const MainImage = ({ product, mainImage }: IMainImg) => {
    // const [liked, setLiked] = useState(false);
    //
    // const toggleLike = () => {
    //     setLiked(prevLiked => !prevLiked);
    // };

    return (
        <div className="bg-secondary lg:bg-auto  relative max-w-[335px] max-h-[335px] sm:w-[500px] sm:max-h-[500px] rounded-[50px] border-amber-[rgba(207, 224, 250, 1)] border-[1px] border-solid overflow-hidden">
            <img
                src={
                    mainImage !== 'https://back.queen-shops.com'
                        ? mainImage
                        : `https://back.queen-shops.com${product.images1}`
                }
                alt="item"
            />

            {/*<button*/}
            {/*    className="absolute bg-tertiary rounded-[42px] p-[6px] top-5 right-4 mt-2 mr-2"*/}
            {/*    onClick={toggleLike}*/}
            {/*>*/}
            {/*    <Heart size={30} color="red" weight={liked ? 'fill' : 'regular'} />*/}
            {/*</button>*/}
        </div>
    );
};

export default MainImage;
