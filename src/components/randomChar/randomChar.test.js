import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';

describe('Testing RandomChar', () => {
    const char = shallow(<RandomChar/>);
    it('RandomChar have rendered correctly', () => {
        expect(char).toMatchSnapshot();
    });
});