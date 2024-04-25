import React, { useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';

interface AccordionItemProps {
    info: {
        title: string;
        value: string;
    }[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ info }) => {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(prev => !prev);
    };

    return (
        <li className="mb-8">
            <div onClick={toggle} className="flex justify-between items-center cursor-pointer">
                <span className="text-base sm:text-xl font-semibold mb-4">Подробнее о товаре</span>
                {isActive ? <Minus size={24} /> : <Plus size={24} />}
            </div>

            <div
                className={` text-sm sm:text-lg overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40' : 'max-h-0'}`}
                style={{ fontSize: '16px' }}
            >
                <div className="flex flex-row justify-between">
                    <ul>
                        {info.map((el, inx) => (
                            <li key={inx} className="mb-[13px]">
                                {el.title}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {info.map((el, inx) => (
                            <li key={inx} className="mb-[13px]">
                                {el.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
};
export default AccordionItem;
