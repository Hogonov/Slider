import React, {useState, useContext, useCallback, useEffect} from 'react';
import {AuthContext} from "../../Context/AuthContext";
import {useHttp} from "../../Hooks/fetch.hook";
import SimpleImageSlider from "react-simple-image-slider";
import style from "../../Styles/PageStyles/Main.module.scss"
import {Loader} from "../../Components/Loader";

type Images = Array<{ id: string, url: string }>

export const Main: React.FC = () => {
    const {request, loading} = useHttp();
    const auth = useContext(AuthContext);

    const [images, setImages] = useState<Images>([])
    const fetchAds = useCallback(async () => {
        try {
            await request('/api/slider/get_all', 'GET', null,
                {Authorization: `Bearer ${auth.token}`}).then(resolve => {
                setImages(resolve.images)
            })
        } catch (e) {
        }
    }, [auth.token, request])
    useEffect(() => {
        fetchAds().then()
    }, [fetchAds])

    if (loading) return <Loader/>

    return <>{images.length > 0 &&
    <div id="form" className={style.main}>
        <SimpleImageSlider
            width={1000}
            height={500}
            images={images}
            style={{borderRadius: "5px"}}
            showBullets showNavs/>
    </div>
    }
    </>
}
