import React, {useState, useContext} from 'react'
import {AuthContext} from "../../Context/AuthContext"
import {Button} from "../../Components/Button"
import {useHttp} from "../../Hooks/fetch.hook"
import style from '../../Styles/PageStyles/Auth.module.scss'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


type Form = { username: string, password: string }

export const Auth: React.FC = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [form, setForm] = useState<Form>({username: '', password: ''})

    const changeHandler: any = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.id]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.login)
        } catch (e) {

        }
    }
    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form})
        } catch (e) {
        }
    }

    return <div className={style.main}>
        <div className={style.title}>Авторизация</div>
        <div>
            <label htmlFor="username">Введите свое имя пользователя</label>
            <input className='custom-input'
                   type="text"
                   id="username"
                   onChange={changeHandler}
                   value={form.username}
                   placeholder='Введите свое имя пользователя'/>
        </div>

        <div>
            <label htmlFor="password">Введите свой пароль</label>
            <input className='custom-input'
                   type="password"
                   id="password"
                   onChange={changeHandler}
                   value={form.password}
                   placeholder='Введите свой пароль'/>
        </div>

        <Button text='Войти' clickHandler={loginHandler} styles={{}}/>
        <Button text='Зарегистрировать' clickHandler={registerHandler} styles={{float:"right"}}/>
    </div>
}
