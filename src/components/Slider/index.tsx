import { useEffect, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

import { imageSlider } from '../../api/data';

import styles from './styles.module.scss';

export function Slider() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (imageSlider.length) {
            const interval = setInterval(() => {
                if (value < imageSlider.length - 1) {
                    setValue(value + 1);
                } else {
                    setValue(0);
                }
            }, 6000 * 1); // 6 segundos para alterar a imagem

            return () => {
                clearInterval(interval);
            };
        }
    }, [value]);

    function ImagePrevious() {
        if (value > 0) {
            setValue(value - 1);
        } else {
            setValue(imageSlider.length - 1);
        }
    }
    function ImageForward() {
        if (value < imageSlider.length - 1) {
            setValue(value + 1);
        } else {
            setValue(0);
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
                src={`${imageSlider[value].image}`}
                alt={`${imageSlider[value].id}`}
            />
            <div className={styles.information}>
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
