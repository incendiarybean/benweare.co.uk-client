import '../../../index.css';

import FooterComponent from './footer-component';

describe('<FooterComponent />', () => {
    it('should render without any props', () => {
        cy.mount(<FooterComponent />);
    });
    it('should render with the correct version number', () => {
        cy.mount(<FooterComponent />);

        cy.get('[data-cy="version-number"]').should(
            'contain.text',
            `v${process.env.VITE_APP_VERSION}`
        );
    });
});
