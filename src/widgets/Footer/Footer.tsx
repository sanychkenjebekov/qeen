import './footer.module.css';
import {
    InstagramLogo,
    WhatsappLogo,
    TelegramLogo,
    PhoneCall,
    EnvelopeSimple,
    MapPin,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import logo from '../../../public/Icons/logo.svg';

const Footer = () => {
    return (
        <footer className="max-h-[570px] mt-24 mb-24 bg-tertiary-800 text-primary p-10">
            <div className="max-w-[1200px] sm:pb-40 pb-7 border-b-2 border-primary-800 mx-auto flex flex-col sm:flex-row justify-between font-montserrat text-base font-medium leading-4 tracking-normal">
                <div>
                    <img src={logo} alt="" />
                </div>
                <div className="max-w-[213px] h-[114px] flex flex-col justify-between sm:mt-0 mt-8">
                    <div className="flex items-center">
                        <PhoneCall size={24} />
                        <a href="#" className="ml-3">
                            +996 123 123
                        </a>
                    </div>
                    <div className="flex items-center">
                        <EnvelopeSimple size={24} />
                        <a href="#" className="ml-3">
                            Exampledigitale@.com
                        </a>
                    </div>
                    <div className="flex items-center">
                        <MapPin size={24} />
                        <a href="#" className="ml-3">
                            Бишкек
                        </a>
                    </div>
                </div>
                <nav className="hidden md:block">
                    <ul>
                        <li className="mb-2">
                            <a href="#">О нас</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Доставка</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Оплата</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Каталог</a>
                        </li>
                    </ul>
                </nav>
                <nav className="hidden md:block">
                    <ul>
                        <li className="mb-2">
                            <a href="#">Брюки</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Джинсы</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Платья</a>
                        </li>
                        <li className="mb-2">
                            <a href="#">Рубашки</a>
                        </li>
                    </ul>
                </nav>
                <div className="w-[139px] flex flex-col justify-start sm:mt-0 mt-6">
                    <p className="font-montserrat font-medium leading-4 tracking-normal">
                        Социальные сети
                    </p>
                    <div className="w-[139px] flex justify-around mt-6">
                        <Link to="/">
                            <WhatsappLogo size={24} />
                        </Link>
                        <Link to="/">
                            <InstagramLogo size={24} />
                        </Link>
                        <Link to="/">
                            <TelegramLogo size={24} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto sm:pt-12 pt-5 text-primaryDark">
                <p className="sm:w-[360px] font-montserrat text-primaryDark font-medium leading-4 text-center">
                    {' '}
                    © 2024 ООО &ldquo; Queen &ldquo; | Все права <br /> защищены
                </p>
            </div>
        </footer>
    );
};

export default Footer;
