import { FC, memo } from 'react';
import ProductCategories from './ProductCategories';
import ProductColors from './ProductColors';
import ProductSizes from './ProductSizes';

interface ProductFilterProps {
    handleSelectFilter: (arg: string[]) => void;
}

export const ProductFilters: FC<ProductFilterProps> = memo(props => {
    const { handleSelectFilter } = props;

    return (
        <aside className="hidden lg:flexCenter self-start w-[295px] bg-secondary rounded-[30px] p-5 ">
            <ul className="text-primary full-width">
                <li>
                    <ProductCategories handleSelectFilter={handleSelectFilter} />
                </li>
                <li>
                    <ProductSizes handleSelectFilter={handleSelectFilter} />
                </li>
                <li>
                    <ProductColors handleSelectFilter={handleSelectFilter} />
                </li>
            </ul>
        </aside>
    );
});
