import { ChangeCategory } from '@/features/Categories';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';

const AdminPanelChangeCategory = () => {
    return (
        <section className="max-admin-container">
            <AdminPanelHeader text="Изменить категорию" />
            <ChangeCategory />
        </section>
    );
};

export default AdminPanelChangeCategory;
