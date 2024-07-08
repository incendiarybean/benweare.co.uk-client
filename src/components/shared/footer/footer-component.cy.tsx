import '../../../index.css';

import FooterComponent from './footer-component';

describe('<FooterComponent />', () => {
    it('should render without any props', () => {
        cy.mount(<FooterComponent />);
    });

    it('should render with the correct version number', () => {
        cy.mount(<FooterComponent />);

        const package_version =
            VITE_APP_VERSION ??
            Cypress.env('VITE_APP_VERSION') ??
            process.env?.VITE_APP_VERSION;

        cy.get('[data-cy="version-number"]').should(
            'contain.text',
            `v${package_version}`
        );
    });
});
