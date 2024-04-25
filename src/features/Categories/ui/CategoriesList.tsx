import { Link } from 'react-router-dom';
import { AppRoutes, routeConfig } from '@/app/providers/router/config/routeConfig';
import Button from '@/shared/ui/Buttons/Button';
import { FC, memo } from 'react';
import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';

interface CategoriesListProps {
    categories: CategorysTypes[] | undefined;
    deleteCategoryById: (id: number) => void;
}

export const CategoriesList: FC<CategoriesListProps> = memo(props => {
    const { categories, deleteCategoryById } = props;

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24 justify-items-center">
            {categories?.map(category => (
                <li key={category.id}>
                    <Link
                        to={routeConfig[AppRoutes.ADMIN_PANEL_SUBCATEGORIES].path || ''}
                        className="block max-w-[300px]"
                    >
                        <div className="bg-secondary h-52 object-contain">
                            <img
                                src={category.image}
                                className="w-full h-full rounded-xl"
                                alt="categories images"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-center my-2 text-2xl font-bold ">{category.title}</p>
                    </Link>
                    <div className="flexCenter gap-3">
                        <Link
                            to={`/admin_change_categories/${category.id}`}
                            className="bg-secondary rounded-xl p-3 border border-primary block my-5 hover:bg-primary hover:text-secondary transition duration-500"
                        >
                            Изменить
                        </Link>

                        <Button
                            onClick={() => deleteCategoryById(category.id)}
                            typeButton=""
                            type="submit"
                            style="!p-3 bg-secondary !font-normal !text-base w-fit rounded-xl border border-primary block my-5 hover:bg-primary transition-all duration-500 hover:text-secondary"
                        >
                            Удалить
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
});
