import React, { memo, useCallback, useState, useRef } from 'react';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { MobileFilterList } from './MobileFilterList';
import { MobileCategoryList } from './MobileCategoryList';
import { ProductFilterMobileHeader } from './ProductFilterMobileHeader';

interface ProductFilterMobileProps {
    handleSelectFilter: (agr: string[]) => void;
}

export const ProductFilterMobile: React.FC<ProductFilterMobileProps> = memo(props => {
    const { handleSelectFilter } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filterName, setFilterName] = useState<string>('Фильтр');
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleOpenCategory = useCallback(
        (value: string) => {
            setIsCategoryOpen(!isCategoryOpen);
            setFilterName(value);
        },
        [isCategoryOpen, filterName],
    );

    const ref = useRef(null);
    useClickOutside(toggleMenu);

    return (
        <section>
            <button onClick={toggleMenu} className="lg:hidden bg-secondary p-4 rounded-lg">
                Фильтр
            </button>
            <div
                ref={ref}
                className={`${!isOpen ? `transform translate-y-[650px] overflow-scroll` : 'translate-y-[300px]'} transition-all duration-500 bg-secondary h-[650px] fixed bottom-0 left-0 w-full px-6 lg:hidden z-10`}
            >
                <ProductFilterMobileHeader
                    categoryOpen={isCategoryOpen}
                    filterName={filterName}
                    toggleMenu={toggleMenu}
                    setCategoryOpen={setIsCategoryOpen}
                />
                <MobileFilterList
                    handleOpenCategory={handleOpenCategory}
                    categoryOpen={isCategoryOpen}
                />
                <MobileCategoryList
                    handleSelectFilter={handleSelectFilter}
                    categoryOpen={isCategoryOpen}
                    filterName={filterName}
                />
            </div>
        </section>
    );
});
