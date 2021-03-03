import React, { useEffect, useState } from 'react';
import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface Props {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<Props> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };
        window.addEventListener('resize', listener);
    }, [width]);

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            height: Infinity,
            width,
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            },
        };
    } else {
        resizableProps = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, innerHeight * 0.9],
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
        };
    }
    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;