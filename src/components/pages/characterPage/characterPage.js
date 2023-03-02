import React, { Component } from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrMessage from '../../errMessage/errMessage';
import GotService from '../../../serviсes/getServiсe';
import RowBlock from '../../rowBlock/rowBlock';

export default class CharacterPage extends Component {
    state = {
        itemId: null,
        error: false
    }

    gotService = new GotService();

    updateCharId = (id) => {
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
        const { error } = this.state;

        if (error) {
            return <ErrMessage />;
        }

        const itemList = (
            <ItemList
                itemId={this.updateCharId}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        )

        const detailsItem = (
            <ItemDetails
                itemId={this.state.itemId}
                getData={this.gotService.getCharacter} >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )

        return (
            <RowBlock list={itemList} details={detailsItem} />
        )
    }
}