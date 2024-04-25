import { useGetCategoriesQuery } from '@/features/Categories/ui/model/services/categoriesAPI';
import { useGetSubcategoriesQuery } from '@/features/SubCategories/ui/services/apiSubCategories';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { memo, useState } from 'react';

interface ProductCategoriesProps {
    handleSelectFilter: (arg: string[]) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = memo(({ handleSelectFilter }) => {
    const { data: categories } = useGetCategoriesQuery();
    const { data: subCategories } = useGetSubcategoriesQuery();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(prev => !prev);
    };
    return (
        <>
            <div onClick={toggle} className="flexBetween  cursor-pointer gap-8">
                <span className="text-base sm:text-xl font-semibold ">Категория</span>
                {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
            </div>
            <div>
                {' '}
                <hr className="my-4 text-primary" />
            </div>
            <div className={`${isOpen ? 'block max-h-64 overflow-scroll ' : 'hidden'}`}>
                {categories &&
                    categories.results.map(category => (
                        <p
                            onClick={() => handleSelectFilter([category.title])}
                            className="text-lg text-primary opacity-70 mb-5 cursor-pointer hover:opacity-100 transition-all duration-300"
                            key={category.id}
                        >
                            {category.title}
                        </p>
                    ))}
                {subCategories &&
                    subCategories.results.map(subCategory => (
                        <p
                            onClick={() => handleSelectFilter([subCategory.title])}
                            className="text-lg text-primary opacity-70 my-5 cursor-pointer hover:opacity-100 transition-all duration-300"
                            key={subCategory.id}
                        >
                            {subCategory.title}
                        </p>
                    ))}
            </div>
        </>
    );
});

export default ProductCategories;
