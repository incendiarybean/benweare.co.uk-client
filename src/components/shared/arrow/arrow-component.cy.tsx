import ArrowComponent from './arrow-component';

describe('<ArrowComponent />', () => {
    it('should render with default values', () => {
        cy.mount(<ArrowComponent />);
    });

    it('should render an upward facing arrow', () => {
        cy.mount(<ArrowComponent upwardFacing />);
        cy.get('svg').should('have.attr', 'data-cy', 'chevron-up');
    });

    it('should render a downward facing arrow', () => {
        cy.mount(<ArrowComponent />);
        cy.get('svg').should('have.attr', 'data-cy', 'chevron-down');
    });

    it('should render a contained upward facing arrow', () => {
        cy.mount(<ArrowComponent upwardFacing container />);
        cy.get('svg').should('have.attr', 'data-cy', 'chevron-up-contained');
    });

    it('should render a contained downward facing arrow', () => {
        cy.mount(<ArrowComponent container />);
        cy.get('svg').should('have.attr', 'data-cy', 'chevron-down-contained');
    });
});
