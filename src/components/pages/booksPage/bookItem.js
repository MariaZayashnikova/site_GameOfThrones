import React, {Component} from 'react';
import GotService from '../../../servises/getServise';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';

export default class BookItem extends Component {
    gotService = new GotService();

    render() {
        return (
            
            <ItemDetails
                itemId={this.props.itemId}
                getData={this.gotService.getBook} >
                    <Field field='numberOfPages' label='Number of pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}
