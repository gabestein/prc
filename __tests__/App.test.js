import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../pages/index';

describe('With Enzyme', () => {
	it('Unauthed app shows "Login page"', () => {
		const app = shallow(<App />);

		expect(app.contains(<p>Please log in.</p>)).toBe(true);
	});
});

describe('With Snapshot Testing', () => {
	it('App shows "Hello, Sunshine!"', () => {
		const component = renderer.create(<App />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
