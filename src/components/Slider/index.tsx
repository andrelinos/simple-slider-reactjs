import { useEffect, useRef, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

import { imageSlider } from '../../api/data';

import styles from './styles.module.scss';

export function Slider() {

    const [value, setValue] = useState(0);
    const [fadeClass, setFadeClass] = useState(styles.mFadeIn)

    const isFadingRef = useRef(false)

    // updated all setValue to updateValue
    // this will fadeOut the element and after 0.5s
    // update the value
    const updateValue = (_value: number) => {
        // only alow to update while element is not fading
        if(isFadingRef.current === false){
            isFadingRef.current = true
            setFadeClass(styles.mFadeOut)
            setTimeout(() => {
                setValue(_value)
            }, 500)
        }
    }

    useEffect(() => {

        // this will trigger fadeIn once value is updated
        setFadeClass(styles.mFadeIn)

        // allow value to be updated
        isFadingRef.current = false

        if (imageSlider.length) {

            const interval = setInterval(() => {
                if (value < imageSlider.length - 1) {
                    // using updateValue instead of setValue
                    updateValue(value + 1);
                } else {
                    updateValue(0);
                }

            }, 1000 * 6); // 6 segundos para alterar a imagem

            return () => {
                clearInterval(interval);
            };
        }
    }, [value]);

    function ImagePrevious() {
        if (value > 0) {
            updateValue(value - 1);
        } else {
            updateValue(imageSlider.length - 1);
        }
    }
    function ImageForward() {
        if (value < imageSlider.length - 1) {
            updateValue(value + 1);
        } else {
            updateValue(0);
        }
    }

    return (
        <div className={styles.container}>
            <span
                className={[styles.left, styles.buttons].join(' ')}
                onClick={ImagePrevious}
            >
                <MdArrowForwardIos />
            </span>
            <img
                className={[styles.loadImage, styles.image, fadeClass].join(' ')}
                src={`${imageSlider[value].image}`}
                alt={`${imageSlider[value].id}`}
            />
            <div className={[styles.information].join(' ')}>
                <span className={styles.title}>
                    {`${imageSlider[value].title}`}
                </span>
                <p
                    className={styles.text}
                    max-lines={2}
                >{`${imageSlider[value].text}`}</p>
            </div>
            <span
                className={[styles.right, styles.buttons].join(' ')}
                onClick={ImageForward}
            >
                <MdArrowForwardIos />
            </span>
        </div>
    );
}
