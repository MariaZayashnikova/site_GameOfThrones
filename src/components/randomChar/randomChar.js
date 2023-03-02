import React, { useState, useEffect } from 'react';
import GotService from '../../serviсes/getServiсe';
import Spinner from '../spinner/spinner';
import ErrMessage from '../errMessage/errMessage';
import './randomChar.css';

function RandomChar({ interval }) {
    const [char, setChar] = useState({});
    let [loading, updateLoading] = useState(true);
    let [error, updateError] = useState(false);
    let gotService = new GotService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, interval);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    function updateChar() {
        const id = Math.round(Math.random() * 140 + 25);

        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    function onCharLoaded(char) {
        setChar(char);
        updateLoading(
            loading = false
        );
    }

    function onError() {
        updateLoading(
            loading = false
        );
        updateError(
            error = true
        );
    }

    let spinner = loading ? <Spinner /> : null;
    let content = !(loading || error) ? <View char={char} /> : null;
    let err = error ? <ErrMessage /> : null;

    return (
        <div className="random-block rounded">
            {spinner}
            {err}
            {content}
        </div>
    );
}

const View = ({ char }) => {
    let { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;