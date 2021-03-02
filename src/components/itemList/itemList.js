import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrMessage from '../errMessage/errMessage';

 class ItemList extends Component {

    createListItem = (arr) => {
        return arr.map(item => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                className="list-group-item"
                key={id}
                onClick={() => this.props.itemId(id)}
                >
                {label}
                </li>
            )
        })
    }

    render() {
        const {data, err, loading} = this.props;
        let elements;

        if(!err && data) {
            elements = this.createListItem(data);
        }

        return (
            
            <ul className="item-list list-group">
                {err}
                {loading}
                {elements}
            </ul>
        );
    }
}

const higherOrderComponent = (View) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        }
    
        componentDidMount() { 
            const {getData} = this.props;
            getData()
                .then((data) => {
                    this.setState({data});
                })
                .catch(() => {
                    this.setState({
                        error: true
                    });
                });
        }

        render() {
            const {data, error} = this.state;

            let err = error ? <ErrMessage/> : null;
            let loading = !data && !error ? <Spinner/> : null;

            return (
                <View {...this.props} data={data} err={err} loading={loading}/>
            )
        }
    }
}

export default higherOrderComponent(ItemList);