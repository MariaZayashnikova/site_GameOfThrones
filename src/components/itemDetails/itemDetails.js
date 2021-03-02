import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner/spinner';
import ErrMessage from '../errMessage/errMessage';

const ItemDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin: 30px 0;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const ItemDetailsSpan = styled.span`
    color: black;
    text-align: center;
    font-size: 24px;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: false,
        error: false
    }

    updateItem = () => {
        if(!this.props.itemId) {
            this.setState({
                loading: true
            });
            return;
        }

        this.setState({
            item: null
        });
        const {getData} = this.props;
   
        getData(this.props.itemId)
            .then((item) => {
                this.setState({item});
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.itemId !== this.props.itemId) {
            this.setState({
                loading: false
            });
            this.updateItem();
        }
    }

    render() {
        const {item, loading, error} = this.state;
        const elements = this.props.children;

        let err = error ? <ErrMessage/> : null;
        let message = loading ? <Message/> : null;
        let spinner = (!loading && !item && !error) ? <Spinner/> : null;
        let content = (!loading && item) ? <View item={item} elements={elements}/> : null;
        
        return (
            <ItemDetailsDiv className="rounded">
                {err}
                {message}
                {spinner}
                {content}
            </ItemDetailsDiv>
        );
    }
}

const View = ({item, elements}) => {
    let {name} = item;

    return (
        <>
        <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(elements, (elem) => {
                        return React.cloneElement(elem, {item});
                    })
                }
            </ul>
        </>
    )
}

const Message = () => {
    return (
        <ItemDetailsSpan>Select Char</ItemDetailsSpan>
    )
}
