import React, {useState, useContext, useCallback, useEffect} from 'react'
import {AuthContext} from "../../Context/AuthContext"
import {Button} from "../../Components/Button"
import {useHttp} from "../../Hooks/fetch.hook"
import style from '../../Styles/PageStyles/Admin.module.scss'
import axios from "axios"
import {toast} from "react-toastify"
import ViewImages from "../../Components/ViewImages";
import {Loader} from "../../Components/Loader";

type Images = Array<{ id: string, url: string }>

export const Admin: React.FC = () => {
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const [image, setImage] = useState<{ imageName: string, image: any }>({
        imageName: '',
        image: {}
    })
    const [images, setImages] = useState<Images>([])

    const fetchImages = useCallback(async () => {
        try {
            await request('/api/slider/get_all', 'GET', null,
                {Authorization: `Bearer ${auth.token}`}).then(resolve => setImages(resolve.images))
        } catch (e) {

        }
    }, [auth.token, request])

    const deleteHandler = useCallback(async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        try {
            await request(`/api/slider/delete/${event.currentTarget.id}`,
                'DELETE', null, {Authorization: `Bearer ${auth.token}`}
            ).then(() => {
                fetchImages()
            })
        } catch (e) {

        }
    }, [fetchImages, auth.token])

    const sendHandler = useCallback(async () => {
        try {
            let formData = new FormData()
            formData.append('image', image.image)
            axios.post('/api/slider/add_file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.token}`
                },
            }).then(() => {
                fetchImages()
                toast('Картинка добавлена')
            })
        } catch (e) {

        }
    }, [fetchImages, auth.token, image])

    const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (event.target.files !== null && event.target.value !== null) {
                setImage({
                    ...image,
                    imageName: event.target.value,
                    image: event.target.files[0]
                })
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        fetchImages().then()
    }, [fetchImages])

    if (loading) return <Loader/>

    return <div className={style.main}>
        <div id='form' className={style.fileForm}>
            <input
                className='custom-input-file'
                type='file'
                name='imageName'
                onChange={changeFileHandler}
            />
            <Button text='Отправить' styles={{marginLeft: '40px'}} clickHandler={sendHandler}/>
        </div>
        {images.length > 0 &&
        <div id='form' className={style.view}>
            <ViewImages images={images} action={deleteHandler}/>
        </div>
        }
    </div>
}
