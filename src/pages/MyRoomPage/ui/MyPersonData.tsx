import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import InputField from '@/shared/ui/Inputs/InputField';
import Button from '@/shared/ui/Buttons/Button';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { logoutState, selectUser } from '@/pages/AuthPage/model/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { selectPersonalUser } from '@/pages/MyRoomPage/model/slice/PersonalSlice';
import { changePersonalUser, getUserInfo } from '@/pages/MyRoomPage/api/personalThunk';
import { PersonalUserMutation } from '@/pages/MyRoomPage/model/types/types';

interface Props {
    activeChange: boolean;
    activeChangeMode: () => void;
}

const MyPersonData: React.FC<Props> = ({ activeChange, activeChangeMode }) => {
    const [state, setState] = useState<PersonalUserMutation>({
        username: 'Alex',
        phone_number: '+99999999',
        email: 'something@email.com',
        password: '123',
    });
    const user = useAppSelector(selectUser);
    const personalUser = useAppSelector(selectPersonalUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    useEffect(() => {
        if (personalUser) {
            setState(personalUser);
        }
    }, [personalUser]);

    useEffect(() => {
        if (!user) {
            return navigate('/login');
        }
    }, [user]);

    const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const sendChange = async (event: FormEvent) => {
        event.preventDefault();
        const zeroInNumber = state.phone_number.includes('0');
        const codeInNumber = state.phone_number.includes('+');
        let phone_number = '';
        if (zeroInNumber) {
            phone_number = '+996' + state.phone_number.slice(1);
        }
        if (codeInNumber) {
            phone_number = '+996' + state.phone_number.slice(4);
        }
        const userData: PersonalUserMutation = {
            email: state.email,
            phone_number,
            username: state.username,
        };
        if (user) {
            await dispatch(changePersonalUser(userData)).unwrap();
            await dispatch(getUserInfo());
            activeChangeMode();
        }
    };

    return (
        <div className={!activeChange ? 'col-span-4 md:col-span-3' : 'col-span-4'}>
            <div className="flex flex-col gap-y-[24px]">
                <h4 className="font-semibold text-[15px]">Мои данные</h4>
                <form onSubmit={sendChange} className="flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[24px] gap-x-3">
                        <InputField
                            name="username"
                            value={state.username}
                            onChange={changeFields}
                            typeField="defoult"
                            type="text"
                            disabled={!activeChange}
                        />
                        <InputField
                            name="phone_number"
                            typeField="defoult"
                            type="text"
                            value={state.phone_number}
                            onChange={changeFields}
                            disabled={!activeChange}
                        />
                        <InputField
                            name="email"
                            typeField="defoult"
                            type="email"
                            value={state.email}
                            onChange={changeFields}
                            disabled={!activeChange}
                        />
                        {/*<InputField*/}
                        {/*    name="password"*/}
                        {/*    typeField="defoult"*/}
                        {/*    type="password"*/}
                        {/*    value={state.password}*/}
                        {/*    onChange={changeFields}*/}
                        {/*    disabled={!activeChange}*/}
                        {/*/>*/}
                    </div>
                    <div className="flex justify-end mt-[32px]">
                        {!activeChange ? (
                            <Button
                                onClick={() => dispatch(logoutState())}
                                type="button"
                                style="w-full md:w-[50%]"
                                typeButton="contained"
                            >
                                Выйти
                            </Button>
                        ) : (
                            <Button type="submit" style="w-full md:w-[50%]" typeButton="contained">
                                Сохранить
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyPersonData;
