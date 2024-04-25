import { Link } from 'react-router-dom';

const OfferSection = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between gap-[50px]">
            <div className="flex flex-col justify-end p-[34px] bg-bg-image-main2 bg-center bg-no-repeat bg-cover rounded-[30px] w-full md:w-[50%] h-[415px]">
                <div className="flex flex-col gap-[16px] max-w-[400px]">
                    <h2 className="text-[22px] md:text-[32px] font-bold text-white">
                        Легкость Весны: Коллекция от Queen
                    </h2>
                    <Link
                        to={'/catalog'}
                        className="max-w-[172px] md:max-w-[250px] text-white text-[12px] md:text-[20px] rounded-[10px] px-[16px] md:px-[24px] py-[10px] md:py-[14px] bg-white/30 backdrop-blur-xl"
                    >
                        Перейти в каталог
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-end p-[34px] bg-bg-image-main3 bg-center bg-no-repeat bg-cover rounded-[30px] w-full md:w-[50%] h-[415px]">
                <div className="flex flex-col gap-[16px] max-w-[400px]">
                    <h2 className="text-[22px] md:text-[32px] font-bold text-white">
                        Легкость Весны: Коллекция от Queen
                    </h2>
                    <button className="max-w-[172px] md:max-w-[250px] text-white text-[12px] md:text-[20px] rounded-[10px] px-[16px] md:px-[24px] py-[10px] md:py-[14px] bg-white/30 backdrop-blur-xl">
                        Перейти в каталог
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
