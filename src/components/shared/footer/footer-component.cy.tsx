import '../../../index.css';

import * as pkg from '../../../../package.json';

import FooterComponent from './footer-component';

describe('<FooterComponent />', () => {
    it('should render without any props', () => {
        cy.mount(<FooterComponent />);
    });
    it('should render with the correct version number', () => {
        cy.mount(<FooterComponent />);

        cy.get('[data-cy="version-number"]').should(
            'contain.text',
            `v${pkg.version}`
        );
    });
});
