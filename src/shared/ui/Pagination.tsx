import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import React, { memo, useEffect, useState } from 'react';

interface PaginationProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    setCurrentPage: (prevPage: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = memo(props => {
    const { data, currentPage, setCurrentPage } = props;
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageToShow, setPageToShow] = useState<number>(1);

    useEffect(() => {
        const handleResize = () => {
            const newPageToShow = window.innerWidth > 768 ? 5 : 1;
            if (pageToShow !== newPageToShow) {
                setPageToShow(newPageToShow);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [pageToShow]);

    useEffect(() => {
        if (data) {
            setTotalPages(Math.floor(data.count / data.results.length));
        }
    }, [data]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const startPage = Math.max(1, currentPage - pageToShow);
    const endPage = Math.min(totalPages, currentPage + pageToShow);

    return (
        <section className="text-primary flexBetween mb-32">
            <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className="text-xs md:text-base bg-secondary rounded-lg flex gap-2 items-center mr-3 w-fit p-2 border border-primary border-opacity-10"
            >
                <ArrowLeft size={16} />
                Назад
            </button>

            <ul className="flex gap-3">
                {startPage > 1 && (
                    <li className="flex">
                        <button onClick={() => handlePageClick(1)} className="...">
                            1
                        </button>
                    </li>
                )}
                {startPage > 2 && <li className="mt-2">...</li>}
                {pages.slice(startPage - 1, endPage).map((page, index) => (
                    <li key={index + 1}>
                        <button
                            onClick={() => typeof page === 'number' && handlePageClick(page)}
                            className={`text-xs md:text-base py-[10px] px-2 md:px-4 rounded-lg cursor-pointer hover:bg-opacity-10 transition-all duration-500 ${currentPage === page ? 'bg-primary bg-opacity-5' : ''}`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                {endPage < totalPages - 1 && <li className="mt-2">...</li>}
                {endPage < totalPages && (
                    <li className="flex">
                        <button onClick={() => handlePageClick(totalPages)} className="...">
                            {totalPages}
                        </button>
                    </li>
                )}
            </ul>
            <button
                disabled={currentPage >= totalPages}
                onClick={handleNextPage}
                className="text-xs md:text-base bg-secondary rounded-lg flex gap-2 items-center w-fit ml-3 p-2 border border-primary border-opacity-10"
            >
                Далее
                <ArrowRight size={16} />
            </button>
        </section>
    );
});

export default Pagination;
