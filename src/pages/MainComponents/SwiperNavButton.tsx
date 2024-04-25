import { useSwiper } from 'swiper/react';
import { ArrowLeft } from '@phosphor-icons/react';

export const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="flex justify-between px-[15px] lg:px-[5px] absolute top-[40%] z-10 w-full">
            <span className="cursor-pointer" onClick={() => swiper.slidePrev()}>
                <ArrowLeft size={32} />
            </span>
            <span className="cursor-pointer" onClick={() => swiper.slideNext()}>
                <ArrowLeft className="rotate-180" size={32} alt="" />
            </span>
        </div>
    );
};
