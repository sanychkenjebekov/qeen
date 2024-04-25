import { AddCategory } from '@/features/Categories';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';

const AdminPanelAddCategory = () => {
    return (
        <section className="max-admin-container padding-admin-container">
            <AdminPanelHeader text="Добавить категорию" />
            <AddCategory />
        </section>
    );
};

export default AdminPanelAddCategory;
