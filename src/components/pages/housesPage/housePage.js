import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrMessage from '../../errMessage/errMessage';
import GotService from '../../../servises/getServise';
import RowBlock from '../../rowBlock/rowBlock';

export default class HousesPage extends Component {

    state = {
        itemId: null,
        error: false
    }

    gotService = new GotService();

    updateHouseId = (id) => {
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

        const itemList = (
            <ItemList
                itemId={this.updateHouseId}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => `${name}`}
            />
        )

        const detailsItem = (
            <ItemDetails
                itemId={this.state.itemId}
                getData={this.gotService.getHouse} >
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock list={itemList} details={detailsItem}/>
        )
    }
}