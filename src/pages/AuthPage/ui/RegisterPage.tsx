import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RegisterMutation } from '@/pages/AuthPage/model/types/RegisterModel';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import { checkCode, register } from '@/pages/AuthPage/api/authThunk';
import { useNavigate } from 'react-router-dom';
import { SealCheck, XCircle } from '@phosphor-icons/react';
import { axiosApi } from '@/app/providers/http/axiosApi';

export const RegisterPage = () => {
    const [state, setState] = useState<RegisterMutation>({
        name: '',
        number: '',
        password: '',
        email: '',
    });
    const [code, setCode] = useState('');
    const steps = ['A', 'B', 'C', 'D', 'E'];
    const [step, setStep] = useState('A');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(60);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (timerStarted) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        clearInterval(intervalId);
                        console.log('Timer reached zero!');
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timerStarted]);

    const handleNextStep = () => {
        const currentStep = steps.indexOf(step);
        if (currentStep < steps.length - 1) {
            setStep(steps[currentStep + 1]);
        }
    };

    const changeField = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            setStep('D');
        } catch (error) {
            setStep('Error');
            console.log(error);
        }
    };

    const checkCodeHandle = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(checkCode(code)).unwrap();
        } catch (error) {
            setStep('Error');
            console.log(error);
        } finally {
            setStep('E');
        }
    };

    const reSendCodeHandle = async () => {
        await axiosApi.post('/users/send-code-to-email/', { email: state.email });
        setTimerStarted(true);
    };

    const formatTime = (time: number) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div className="w-full h-[100vh] bg-secondary md:bg-black md:bg-opacity-50">
            <div className="flexColCenter h-[80vh]">
                <form className="w-[80%] lg:w-[30%]" onSubmit={handleSubmit}>
                    {step === 'A' ? (
                        <div className="bg-thirsty rounded-[20px] py-[20px] px-[24px] flex flex-col gap-y-[24px] text-center">
                            <div className="flex flex-col gap-y-[12px]">
                                <h2 className="font-bold text-primary text-[32px]">Регистрация</h2>
                                <p className="font-normal text-[20px] text-primary">
                                    Введите свою почту
                                </p>
                            </div>
                            <InputField
                                type="email"
                                typeField="defoult"
                                value={state.email}
                                name="email"
                                onChange={changeField}
                                placeholder={'text@mail.com'}
                            />
                            <Button typeButton="primary" type="button" onClick={handleNextStep}>
                                Далее
                            </Button>
                        </div>
                    ) : null}
                    {step === 'B' ? (
                        <div className="bg-thirsty rounded-[20px] py-[20px] px-[24px] flex flex-col gap-y-[24px] text-center">
                            <div className="flex flex-col gap-y-[12px]">
                                <h2 className="font-bold text-primary text-[32px]">
                                    Личные данные
                                </h2>
                                <p className="font-normal text-[20px] text-primary">
                                    Введите свои данные
                                </p>
                            </div>
                            <InputField
                                type="text"
                                typeField="defoult"
                                value={state.name}
                                name="name"
                                onChange={changeField}
                                placeholder={'name'}
                            />
                            <InputField
                                type="text"
                                typeField="defoult"
                                value={state.number}
                                name="number"
                                onChange={changeField}
                                placeholder={'+996'}
                            />
                            <Button typeButton="primary" type="button" onClick={handleNextStep}>
                                Далее
                            </Button>
                        </div>
                    ) : null}
                    {step === 'C' ? (
                        <div className="bg-thirsty rounded-[20px] py-[20px] px-[24px] flex flex-col gap-y-[24px] text-center">
                            <div className="flex flex-col gap-y-[12px]">
                                <h2 className="font-bold text-primary text-[32px]">
                                    Личные данные
                                </h2>
                                <p className="font-normal text-[20px] text-primary">
                                    Придумайте пароль
                                </p>
                            </div>
                            <InputField
                                name="password"
                                type="password"
                                typeField="primary"
                                value={state.password}
                                onChange={changeField}
                                placeholder={'password'}
                            />
                            <InputField
                                name="password"
                                type="password"
                                typeField="primary"
                                value={state.password}
                                onChange={changeField}
                                placeholder={'password'}
                            />
                            <Button typeButton="primary" type="submit">
                                Далее
                            </Button>
                        </div>
                    ) : null}
                </form>
                {step === 'D' ? (
                    <div className="w-[30%] bg-thirsty rounded-[20px] py-[20px] px-[24px] flex flex-col gap-y-[24px] text-center">
                        <div className="flex flex-col gap-y-[12px]">
                            <h2 className="font-bold text-primary text-[32px]">Введите код</h2>
                            <p className="font-normal text-[20px] text-primary">
                                Отправлено на Вашу почту
                            </p>
                        </div>
                        <form onSubmit={checkCodeHandle}>
                            <div className="text-start flex flex-col gap-y-[12px]">
                                <InputField
                                    name="code"
                                    type="password"
                                    typeField="primary"
                                    value={code}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        setCode(event.target.value)
                                    }
                                    placeholder={'code'}
                                />
                                <button
                                    onClick={reSendCodeHandle}
                                    type="button"
                                    disabled={timerStarted}
                                    className={`${timerStarted ? 'text-gray-400' : 'text-[#0246AC]'} text-left my-3 cursor-pointer font-normal text-[14px]`}
                                >
                                    Отправить еще раз{' '}
                                    {timerStarted
                                        ? `${formatTime(Math.floor(seconds / 60))} : ${formatTime(seconds % 60)}`
                                        : null}
                                </button>
                            </div>
                            <Button typeButton="primary" type="submit">
                                Далее
                            </Button>
                        </form>
                    </div>
                ) : null}
                {step === 'E' ? (
                    <div className="w-[30%] bg-thirsty rounded-[20px] py-[20px] px-[24px] flex flex-col gap-y-[24px] text-center justify-center">
                        <div className="flex justify-center">
                            <SealCheck size={120} color="#71AC02" />
                        </div>
                        <h2 className="font-bold text-primary text-[30px]">
                            Ваш аккаунт
                            <br /> успешно создан
                        </h2>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-primary text-white font-semibold text-[20px] py-[10px] rounded-[10px]"
                        >
                            На главную
                        </button>
                    </div>
                ) : null}
                {step === 'Error' ? (
                    <div className="w-[30%] bg-thirsty rounded-[20px] py-[20px] px-[24px] flex flex-col gap-y-[24px] text-center justify-center">
                        <div className="flex justify-center">
                            <XCircle size={120} color="#BF2025" />
                        </div>
                        <h2 className="font-bold text-primary text-[30px]">Что то пошло не так!</h2>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-primary text-white font-semibold text-[20px] py-[10px] rounded-[10px]"
                        >
                            На главную
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
