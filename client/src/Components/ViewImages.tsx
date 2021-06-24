import React from 'react';
import style from '../Styles/ComponentsStyles/ViewImages.module.scss'
type Types = {
    images: Array<{ id: string, url: string}>
    action(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void
}

export const ViewImages:React.FC<Types> = ({images, action}) => {

    return <>
        {images.map((value, index) => {
            return <div key={index} className={style.imageBlock}>
                <img src={value.url} id={value.id} alt='' width='100%' onClick={action}/>
            </div>
        })}
    </>

}

export default ViewImages;
