import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-primary mb-5">
                    404
                </p>
                <p className="text-4xl md:text-5xl font-bold tracking-wider text-primary mt-2 mb-5">
                    Страница не найдена
                </p>
                <Link
                    to="/"
                    className="flex items-center text-secondary space-x-2 bg-primary hover:bg-secondary hover:text-black outline outline-secondary transition-all duration-500 px-4 py-2 rounded mt-5"
                    title="Return Home"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
