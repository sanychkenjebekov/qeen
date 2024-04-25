import React, { useState } from 'react';
import { Heart } from '@phosphor-icons/react';

interface Props {
    image: string;
    title: string;
    price: string;
}

const ItemCard: React.FC<Props> = ({ image, title, price }) => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(prevLiked => !prevLiked);
    };
    return (
        <div className="max-w-[180px] sm:max-w-[300px]">
            <div className="bg-secondary relative rounded-[30px] mb-[20px]">
                <img src={image} alt="item" />

                <button
                    className="bg-tertiary rounded-[8px] p-[6px] absolute top-5 right-4 mt-2 mr-2"
                    onClick={toggleLike}
                >
                    <Heart size={30} color="red" weight={liked ? 'fill' : 'regular'} />
                </button>
            </div>
            <p className="font-semibold ms-[20px] mb-[15px] text-base sm:text-2xl">{title}</p>
            <p className="font-semibold ms-[20px] text-sm sm:text-base">{price}</p>
        </div>
    );
};

export default ItemCard;
