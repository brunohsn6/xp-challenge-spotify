import React, { useEffect, useRef, useState } from 'react';
import './Carroussel.scss';

export function Carroussel(props): JSX.Element {
    const sliderRef = useRef<HTMLDivElement>();
    const [sliderOffset, setSliderOffset] = useState(0);
    const [scrollSize, setScrollSize] = useState(0);
    const [scrollSkipWidth, setScrollSkipWidth] = useState(0);
    useEffect(() => {
        setScrollSize(sliderRef.current.scrollWidth);
        setScrollSkipWidth(sliderRef.current.offsetWidth);
    }, []);
    const slide = (direction: 0 | 1) => {
        debugger;
        if (sliderRef && sliderRef.current != undefined) {
            const scrollWidth = sliderRef.current.scrollWidth;
            let scrollTo = 0;
            if (direction == 0) {
                scrollTo = sliderOffset - scrollSkipWidth;
                if (scrollTo <= 0) {
                    scrollTo = 0;
                }
            } else {
                scrollTo = sliderOffset + scrollSkipWidth;
                if (scrollTo >= scrollWidth) {
                    scrollTo = scrollWidth;
                }
            }
            sliderRef.current.scrollTo(scrollTo, 0);
            setSliderOffset(scrollTo);
        }
    };
    return (
        <section className="content-list">
            <button
                className="skipper-left"
                disabled={sliderOffset == 0}
                onClick={() => slide(0)}
            >
                <i className="arrow-left" />
            </button>
            <div ref={sliderRef} className="slider">
                {props.children}
            </div>
            <button
                className="skipper-right"
                disabled={sliderOffset == scrollSize}
                onClick={() => slide(1)}
            >
                <i className="arrow-right" />
            </button>
        </section>
    );
}
