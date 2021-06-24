import React from 'react';
type SliderTypes = {
    images: Array<{ id: string, url: string }>
}

export const Slider:React.FC<SliderTypes> = ({images}) => {

    return <div className="banner-section mb-30 mt-15">
        <div className="container">
            <div className="banner-section__slider ">
                {images.map((value, index) => {
                    return <a key={index} className="banner-section__slider-item" href="#">
                        <img style={{width: '50%'}} className="banner-section__slider-img" src={value.url} alt=""/>
                    </a>
                })}
            </div>
        </div>
    </div>

}

export default Slider;
