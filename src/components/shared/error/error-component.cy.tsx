import '../../../index.css';

import ErrorComponent from './error-component';

describe('<ErrorComponent />', () => {
    it('should render with no provided feed name', () => {
        cy.mount(<ErrorComponent />);

        cy.get('[data-cy="error-component"]').should('exist');
        cy.get('[data-cy="error-component"]').should('be.visible');
        cy.get('[data-cy="error-component"]').should(
            'contain.text',
            'ERROR: component has failed to load.'
        );
    });

    it('should render with a provided feed name', () => {
        cy.mount(<ErrorComponent feedName='News' />);

        cy.get('[data-cy="error-component"]').should('exist');
        cy.get('[data-cy="error-component"]').should('be.visible');
        cy.get('[data-cy="error-component"]').should(
            'contain.text',
            'ERROR:News component has failed to load.'
        );
    });
});
