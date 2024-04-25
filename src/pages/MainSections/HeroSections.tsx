const HeroSections = () => {
    return (
        <section className=" mt-[50px]">
            <div className="flex flex-col items-start justify-end gap-[8px] md:gap-[16px] md:h-[577px] h-[286px] rounded-[15px] md:rounded-[30px] p-[20px] md:p-[50px] bg-bg-image-main bg-center bg-cover bg-no-repeat">
                <h1 className="max-w-[286px] md:max-w-[472px] text-[22px] md:text-[32px] font-bold text-white">
                    Стильная одежда для истинных королев
                </h1>
                <button className="text-white text-[12px] md:text-[20px] rounded-[10px] px-[16px] md:px-[24px] py-[10px] md:py-[14px] bg-white/30 backdrop-blur-xl">
                    Перейти в каталог
                </button>
            </div>
        </section>
    );
};

export default HeroSections;
