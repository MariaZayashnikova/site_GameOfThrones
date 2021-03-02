import React from 'react';
import img from '../app/img/watch-game-of-thrones-tile.jpg';
import './startComponent.css';


function StartComponent() {
    return (
        <div className="start-component">
            <img src={img} alt='start'></img>
            <span className="start-text">Welcome to my project 'Game of Thrones'. Go to the characters page or books page or houses page for full details.</span>
        </div>
    )
}

export default StartComponent;