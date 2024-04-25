import { FC, memo } from 'react';
import cls from './AdminPanelHeader.module.scss';

interface AdminPanelHeaderTypes {
    text: string;
}

export const AdminPanelHeader: FC<AdminPanelHeaderTypes> = memo(props => {
    const { text } = props;
    return (
        <section className={cls.container}>
            <p>{text}</p>
            <p></p>
            <nav aria-label="breadcrumb">
                <ol></ol>
            </nav>
        </section>
    );
});
