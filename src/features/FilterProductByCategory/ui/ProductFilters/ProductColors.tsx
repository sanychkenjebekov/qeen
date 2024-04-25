import { useGetColorsQuery } from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { memo, useState } from 'react';

interface ProductColorsProps {
    handleSelectFilter: (arg: string[]) => void;
}

const ProductColors: React.FC<ProductColorsProps> = memo(({ handleSelectFilter }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: colors } = useGetColorsQuery();

    const toggle = () => {
        setIsOpen(prev => !prev);
    };
    return (
        <>
            <div onClick={toggle} className="flexBetween  cursor-pointer gap-8">
                <span className="text-base sm:text-xl font-semibold ">Цвет</span>
                {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
            </div>
            <div>
                <hr className="my-4 text-primary" />
            </div>
            <div className={`${isOpen ? 'block max-h-64 overflow-scroll' : 'hidden'}`}>
                {colors &&
                    colors.results.map(color => (
                        <p
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            onClick={() => handleSelectFilter([color.colors])}
                            className="text-lg text-primary opacity-70 mb-5 cursor-pointer hover:opacity-100 transition-all duration-300"
                            key={color.id}
                        >
                            {color.colors}
                        </p>
                    ))}
            </div>
        </>
    );
});

export default ProductColors;
