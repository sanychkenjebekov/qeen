import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, memo, useEffect, useState } from 'react';

interface SuccessErrorMessageProps {
    isSuccess: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    text: string;
}

const SuccessErrorMessage: FC<SuccessErrorMessageProps> = memo(props => {
    const { isSuccess, error, text } = props;
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (isSuccess || error) {
            setShowMessage(true);

            const timeout = setTimeout(() => {
                setShowMessage(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [isSuccess, error]);

    return (
        <>
            {showMessage &&
                (isSuccess ? (
                    <p className="text-lg text-lightGreen font-semibold">{text} </p>
                ) : (
                    error && <p className="text-lg text-red font-semibold">Что то пошло не так !</p>
                ))}
        </>
    );
});

export default SuccessErrorMessage;
