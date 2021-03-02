import React from 'react';
import img from './error.jpg';
import './error.css';

const ErrMessage = () => {
    return (
        <>
            <span>Something goes wrong</span>
            <img className="error" src={img} alt='Error'></img>
        </>
    )
}

export default ErrMessage;