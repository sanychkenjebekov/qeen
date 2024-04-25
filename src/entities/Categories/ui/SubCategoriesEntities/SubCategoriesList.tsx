import { SubCategory } from '@/features/Categories/ui/model/types/subCategory.types';
import Button from '@/shared/ui/Buttons/Button';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface SubCategoriesListProps {
    subCategories: SubCategory[] | undefined;
    deleteSubcategory: (id: string | undefined) => void;
}

export const SubCategoriesList: React.FC<SubCategoriesListProps> = memo(props => {
    const { subCategories, deleteSubcategory } = props;

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24 justify-items-center">
            {subCategories?.map(category => (
                <div className="text-primary cursor-pointer" key={category.id}>
                    <img
                        className="w-[302px] h-[302px] object-cover rounded-3xl mb-4"
                        src={category.image}
                        loading="lazy"
                        alt={category.title}
                    />
                    <li
                        style={{ wordBreak: 'break-word' }}
                        className="text-base text-center font-semibold"
                    >
                        Название: {category.title}
                    </li>
                    <li
                        style={{ wordBreak: 'break-word' }}
                        className="text-base text-center font-semibold"
                    >
                        Категория: {category.category_title}
                    </li>
                    <li className="flexCenter gap-3">
                        <Link
                            to={`/admin_panel_change_subcategories/${category.id}`}
                            className="bg-secondary rounded-xl p-3 border border-primary block my-5 hover:bg-primary hover:text-secondary transition duration-500"
                        >
                            Изменить
                        </Link>
                        <Button
                            onClick={() => deleteSubcategory(category.id)}
                            typeButton=""
                            type="submit"
                            style="!p-3 bg-secondary !font-normal !text-base w-fit rounded-xl border border-primary block my-5 hover:bg-primary transition-all duration-500 hover:text-secondary"
                        >
                            Удалить
                        </Button>
                    </li>
                </div>
            ))}
        </ul>
    );
});
