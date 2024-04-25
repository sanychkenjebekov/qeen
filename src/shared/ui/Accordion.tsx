import React, { useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';

interface AccordionProps {
    desc: string;
}

const Accordion: React.FC<AccordionProps> = ({ desc }) => {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(prev => !prev);
    };

    return (
        <li className="mb-8">
            <p onClick={toggle} className="flexBetween cursor-pointer">
                <span className="text-base sm:text-xl font-semibold mb-3">Описание</span>
                {isActive ? <Minus size={24} /> : <Plus size={24} />}
            </p>
            <p
                className={`text-sm sm:text-lg overflow-hidden transition-all duration-500 ${isActive ? 'max-h-20' : 'max-h-0'}`}
            >
                {desc}
            </p>
        </li>
    );
};

export default Accordion;
