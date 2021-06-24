import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import style from '../Styles/ComponentsStyles/Header.module.scss'


export const Header: React.FC = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event: any) => {
        event.preventDefault();
        auth.logout();
        history.push('/main')
    }

    return (
        <>
            <nav className={style.navHeader}>
                <div>
                    <ul className={style.leftBlock}>
                        <li>
                            <div className="brand-logo">Слайдер</div>
                        </li>
                    </ul>
                    <ul className="right">
                        <li><Link className={style.headerNavLink} to="/main">Главная страница</Link></li>
                        {auth.isAuthenticated && <>
                            <li><Link className={style.headerNavLink} to="/admin">Админка</Link></li>
                            <li><Link className={style.headerNavLink} to="/" onClick={logoutHandler}>Выйти</Link></li>
                        </>}
                        {!auth.isAuthenticated &&
                        <li><Link className={style.headerNavLink} to="/login">Войти</Link></li>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
