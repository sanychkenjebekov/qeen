import { AppRoutes, routeConfig } from '@/app/providers/router/config/routeConfig';
import { CategoriesList } from '@/features/Categories';
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from '@/features/Categories/ui/model/services/categoriesAPI';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';
import { Placeholder } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const AdminPanelCategories = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const deleteCategoryById = (id: number) => {
        deleteCategory(id);
    };

    return (
        <section className="max-admin-container padding-admin-container">
            <AdminPanelHeader text="Категории товаров" />
            <Link
                to={routeConfig[AppRoutes.ADMIN_PANEL_ADD_CATEGORIES].path || ''}
                className="admin-button text-base"
            >
                Добавить категорию
            </Link>
            <RequestProcessing isLoading={isLoading} error={error} />
            {categories?.results.length === 0 ? (
                <h1 className="flexCenter gap-5 text-center text-2xl text-primary font-semibold">
                    Нет категорий <Placeholder size={32} />
                </h1>
            ) : (
                <CategoriesList
                    categories={categories?.results}
                    deleteCategoryById={deleteCategoryById}
                />
            )}
        </section>
    );
};

export default AdminPanelCategories;
