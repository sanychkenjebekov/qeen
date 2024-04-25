import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';
import { ChangeEvent, FC, ReactNode, memo } from 'react';

interface SelectTypes {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    name: string;
    children: ReactNode;
    multipleType?: boolean;
}

const Select: FC<SelectTypes> = memo(props => {
    const { value, onChange, data, name, children, multipleType } = props;

    return (
        <select
            multiple={multipleType}
            key={name}
            className="block max-w-56 mb-5 p-3 rounded-lg"
            name={name}
            id={name}
            value={value}
            onChange={onChange}
        >
            <option value="">{children}</option>
            {data &&
                data.map((category: CategorysTypes, i: number) => (
                    <option key={i + 1} value={category.id}>
                        {category.title}
                    </option>
                ))}
        </select>
    );
});

export default Select;
