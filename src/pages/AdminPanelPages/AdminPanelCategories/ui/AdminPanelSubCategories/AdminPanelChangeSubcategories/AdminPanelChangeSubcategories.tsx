import { ChangeSubCategory } from '@/features/Categories';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';

const AdminPanelChangeSubcategories = () => {
    return (
        <section className="max-admin-container padding-admin-container">
            <AdminPanelHeader text="Изменить под категорию" />
            <ChangeSubCategory />
        </section>
    );
};

export default AdminPanelChangeSubcategories;
