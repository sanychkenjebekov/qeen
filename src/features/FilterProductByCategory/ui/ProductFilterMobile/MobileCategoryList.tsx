/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { memo } from 'react';
import { useGetCategoriesQuery } from '@/features/Categories/ui/model/services/categoriesAPI';
import { useGetColorsQuery } from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import { useGetSizesQuery } from '@/features/Colors&Sizes/ui/model/services/sizesApi';
import { useGetSubcategoriesQuery } from '@/features/SubCategories/ui/services/apiSubCategories';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { selectCategories } from '../../model/selectors/selectCategories/selectCategories';

interface MobileCategoryListProps {
    categoryOpen: boolean;
    handleSelectFilter: (agr: string[]) => void;
    filterName: string;
}

export const MobileCategoryList: React.FC<MobileCategoryListProps> = memo(props => {
    const { categoryOpen, handleSelectFilter, filterName } = props;
    const { data: categories } = useGetCategoriesQuery();
    const { data: subCategories } = useGetSubcategoriesQuery();
    const { data: colors } = useGetColorsQuery();
    const { data: sizes } = useGetSizesQuery();
    const selectedCategories = useAppSelector(selectCategories);
    const filters = [
        {
            id: 1,
            name: 'Категории',
            category: [
                ...(categories?.results.map(el => el.title) || []),
                ...(subCategories?.results.map(subCategory => subCategory.title) || []),
            ],
        },
        {
            id: 2,
            name: 'Цвет',
            category: colors?.results.map(el => el.colors),
        },
        {
            id: 3,
            name: 'Размер',
            category: sizes?.results.map(el => el.sizes),
        },
    ];

    return (
        <div className={`${categoryOpen ? 'block' : 'hidden'}`}>
            {filters.map(filter => (
                <div key={filter.name}>
                    {filter.name === filterName && (
                        <>
                            {filter.category &&
                                filter.category.map(category => (
                                    //@ts-ignore
                                    <div key={category}>
                                        <div className="flexBetween">
                                            <label
                                                //@ts-ignore
                                                key={category}
                                                className="font-semibold text-lg"
                                                htmlFor="myCheckbox"
                                            >
                                                {category}
                                            </label>
                                            <input
                                                onClick={() => {
                                                    if (
                                                        selectedCategories
                                                            //@ts-ignore
                                                            .includes(category)
                                                    ) {
                                                        handleSelectFilter(
                                                            //@ts-ignore
                                                            selectedCategories.filter(
                                                                //@ts-ignore
                                                                item => item !== category,
                                                            ),
                                                        );
                                                    } else {
                                                        handleSelectFilter([
                                                            //@ts-ignore
                                                            ...selectedCategories,
                                                            //@ts-ignore
                                                            category,
                                                        ]);
                                                    }
                                                }}
                                                value={category}
                                                type="checkbox"
                                                id="myCheckbox"
                                                className={`appearance-none bg-secondary m-0 w-6 h-6 rounded-[50%] border-2 border-light ${categoryOpen ? 'checked:bg-primary' : ''} `}
                                            />
                                        </div>
                                        <hr className="my-5 text-primary" />
                                    </div>
                                ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
});
