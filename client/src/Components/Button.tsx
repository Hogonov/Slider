import React from 'react';
import style from '../Styles/ComponentsStyles/Button.module.scss'

type Props = {
    text: string;
    styles: React.CSSProperties
    clickHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const Button:React.FC<Props> = ({text, clickHandler, styles}) => {
    return <button className={`btn ${style.button}`} style={styles} onClick={clickHandler}>{text}</button>
}
