import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNavButtons } from './SwiperNavButton';
import { SProps } from './types';

const Slider: React.FC<SProps> = ({
    slidesPerView,
    spaceBetween,
    className,
    slideClassName,
    imageClassName,
    textClassName,
    onClick,
    favorite,
    data,
    break0,
    break500,
    break768,
    break1024,
    break1366,
    break1920,
    break2560,
    freeMode,
}) => {
    return (
        <Swiper
            slidesPerView={slidesPerView ?? 3}
            spaceBetween={spaceBetween ?? 30}
            className={className}
            freeMode={freeMode ?? false}
            breakpoints={{
                0: {
                    slidesPerView: break0 === undefined ? 'auto' : break0,
                },
                768: {
                    slidesPerView: break768 === undefined ? 'auto' : break768,
                },
                500: {
                    slidesPerView: break500 === undefined ? 'auto' : break500,
                },
                1024: {
                    slidesPerView: break1024 === undefined ? 'auto' : break1024,
                },
                1366: {
                    slidesPerView: break1366 === undefined ? 'auto' : break1366,
                },
                1920: {
                    slidesPerView: break1920 === undefined ? 'auto' : break1920,
                },
                2560: {
                    slidesPerView: break2560 === undefined ? 'auto' : break2560,
                },
            }}
            modules={[FreeMode]}
        >
            {favorite ? <SwiperNavButtons /> : null}
            {data?.map((el, idx) => (
                <SwiperSlide className={slideClassName} key={idx}>
                    <Link to={`catalog/one_item/${el.id}`}>
                        {el.image1 || el.image || el.images1 ? (
                            <img
                                onClick={onClick}
                                className={imageClassName}
                                src={el.image || el.image1 || el.images1}
                                alt={el.image || el.image1 || el.images1}
                            />
                        ) : (
                            <div
                                className={`${imageClassName} h-[310px] flex items-center justify-center`}
                            >
                                <p>Нет фото</p>
                            </div>
                        )}
                        {/*{favorite ? (*/}
                        {/*    <button className="flex justify-center items-center absolute right-[25px] top-[15px] rounded-[33px] bg-[#E7E7E7] w-[45px] h-[45px]">*/}
                        {/*        <Heart color="#BF2025" weight={'fill'} size={14} />*/}
                        {/*    </button>*/}
                        {/*) : null}*/}
                        <div className={textClassName}>
                            <h6 className="font-semibold text-[20px] text-ellipsis overflow-hidden">
                                {el.title || el.name}
                            </h6>
                            <p className={favorite ? 'text-[15px]' : 'text-[15px] hidden'}>
                                {el.price} сом
                            </p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

Slider.propTypes = {
    spaceBetween: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
    slideClassName: PropTypes.string.isRequired,
    imageClassName: PropTypes.string.isRequired,
    textClassName: PropTypes.string.isRequired,
};

export default Slider;
