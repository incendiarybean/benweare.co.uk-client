import '../../../index.css';

import ImageLoader from './image-loader';

describe('<ImageLoader />', () => {
    beforeEach(() => {
        cy.intercept('/image.jpg', {
            fixture: 'TestImage.jpg',
        });
    });

    it('should render a pulsing loader when an image is not loaded', () => {
        cy.mount(<ImageLoader loaderClassName='h-64 p-10' />);

        cy.get('[data-cy="image-loader-loading"]').should('exist');

        cy.get('[data-cy="image-loader-loading"]')
            .find('div')
            .should('have.class', 'animate-pulse');

        cy.get('[data-cy="image-loader-loading"]')
            .find('svg')
            .should('have.attr', 'data-cy', 'image-icon');
    });

    it('should render an error when an image has failed to load', () => {
        const img = new Image();
        img.src = 'non-existent-image';

        cy.mount(<ImageLoader img={img} loaderClassName='h-64 p-10' />);

        cy.get('[data-cy="image-loader-loading"]').should('not.exist');
        cy.get('[data-cy="image-loader-failed"]').should('exist');

        cy.get('[data-cy="image-loader-failed"]').should(
            'have.class',
            'text-red-600'
        );

        cy.get('[data-cy="image-loader-failed"]')
            .find('svg')
            .should('have.attr', 'data-cy', 'image-icon');

        cy.get('[data-cy="image-loader-failed"]').should(
            'have.text',
            'Image failed to load'
        );
    });

    it('should render an image when an image has loaded successfully', () => {
        const img = new Image();
        img.src = '/image.jpg';

        cy.mount(<ImageLoader img={img} className='h-64 w-full rounded-md' />);

        cy.get('img').should('exist');

        cy.get('img').should('have.class', 'rounded-md');
    });
});
