import Loader from '@/shared/ui/Loader/Loader';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { memo } from 'react';

interface RequestProcessingProps {
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

const RequestProcessing: React.FC<RequestProcessingProps> = memo(props => {
    const { isLoading, error } = props;
    return (
        <>
            {isLoading && (
                <div className="flexCenter">
                    <Loader />
                </div>
            )}
            {error && (
                <h1 className="flexCenter gap-5 text-center text-2xl text-primary font-semibold">
                    Что то пошло не так !
                </h1>
            )}
        </>
    );
});

export default RequestProcessing;
