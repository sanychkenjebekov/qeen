import Button from '../../shared/ui/Buttons/Button';
import InputField from '../../shared/ui/Inputs/InputField';
import React, { useState } from 'react';

const Examples = () => {
    const [state, setState] = useState('');
    const somethingFunc = () => {
        console.log('clicked');
    };
    return (
        <div className="flexColCenter gap-y-3 my-[40px]">
            <Button type="button" style="w-full" typeButton="primary" onClick={somethingFunc}>
                В корзину
            </Button>
            <Button type="button" typeButton="disabled" onClick={somethingFunc} disabled={true}>
                В корзину
            </Button>
            <Button type="button" typeButton="error" onClick={somethingFunc}>
                В корзину
            </Button>
            <Button type="button" typeButton="contained" onClick={somethingFunc}>
                В корзину
            </Button>
            <InputField
                type="text"
                typeField="defoult"
                value={state}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setState(event.target.value)
                }
                placeholder={'text'}
            />
            <InputField
                type="text"
                typeField="error"
                value={state}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setState(event.target.value)
                }
                placeholder={'error'}
            />
            <InputField
                type="password"
                typeField="primary"
                value={state}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setState(event.target.value)
                }
                placeholder={'password'}
            />
            <InputField
                type="password"
                typeField="error"
                value={state}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setState(event.target.value)
                }
                placeholder={'password'}
            />
        </div>
    );
};

export default Examples;
