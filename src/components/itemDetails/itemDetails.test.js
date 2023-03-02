import React from 'react';
import ItemDetails from './itemDetails';
import {shallow} from 'enzyme';

describe('Testing RandomChar', () => {
    const item = shallow(<ItemDetails/>);

    it('ItemDetails have rendered correctly', () => {
        expect(item).toMatchSnapshot();
    });

    it('ItemDetails state "loading" is true', () => {
        expect(item.state().loading).toBeTruthy();
    });

});