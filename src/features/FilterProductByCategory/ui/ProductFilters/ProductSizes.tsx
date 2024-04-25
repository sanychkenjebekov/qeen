import { useGetSizesQuery } from '@/features/Colors&Sizes/ui/model/services/sizesApi';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { memo, useState } from 'react';

interface ProductSizesProps {
    handleSelectFilter: (arg: string[]) => void;
}

const ProductSizes: React.FC<ProductSizesProps> = memo(({ handleSelectFilter }) => {
    const { data: sizes } = useGetSizesQuery();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
            <div onClick={toggle} className="flexBetween  cursor-pointer gap-8">
                <span className="text-base sm:text-xl font-semibold ">Размер</span>
                {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
            </div>
            <div>
                <hr className="my-4 text-primary" />
            </div>
            <div className={`${isOpen ? 'block max-h-64 overflow-scroll' : 'hidden'}`}>
                {sizes &&
                    sizes?.results.map(size => (
                        <p
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            onClick={() => handleSelectFilter([size.sizes])}
                            className="text-lg text-primary opacity-70 mb-5 cursor-pointer hover:opacity-100 transition-all duration-300"
                            key={size.id}
                        >
                            {size.sizes}
                        </p>
                    ))}
            </div>
        </>
    );
});

export default ProductSizes;
