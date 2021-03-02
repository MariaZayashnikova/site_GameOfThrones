import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ErrMessage from '../../errMessage/errMessage';
import GotService from '../../../servises/getServise';
import {withRouter} from 'react-router-dom';


 class BooksPage extends Component {

    state = {
        itemId: null,
        error: false
    }

    gotService = new GotService();

    updateBookId = (id) => {
        this.setState({
            itemId: id
        });
    };
    
    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        const {error} = this.state;

        if (error) {
            return <ErrMessage/>;
        }

        return (
            <ItemList
                itemId={(id) => {
                    this.props.history.push(id);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}
            />
        )
    }
}

export default withRouter(BooksPage);