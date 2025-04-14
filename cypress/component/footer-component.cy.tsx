import '../../src/index.css';

import FooterComponent from '../../src/components/shared/footer/footer-component';
import React from 'react';

describe('<FooterComponent />', () => {
    it('should render without any props', () => {
        cy.mount(<FooterComponent />);
    });

    it('should render with the correct version number', () => {
        cy.mount(<FooterComponent />);

        cy.get('[data-cy="version-number"]').should(
            'contain.text',
            `v${Cypress.env('VITE_APP_VERSION')}`
        );
    });
});
