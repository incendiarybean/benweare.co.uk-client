import * as pkg from '../../package.json';

describe('Dashboard Navigation', () => {
    // Start from the index page everytime
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Check version is correct', () => {
        cy.get('[data-cy="version-number"]').contains(
            `v${Cypress.env('VITE_APP_VERSION')}`
        );
    });

    it('Should display the info page and image', () => {
        cy.get('img')
            .should('exist')
            .should('have.attr', 'src', '/src/common/images/profile-256.webp');

        cy.get('[data-cy="information-page"]')
            .find('.list-container')
            .should('be.hidden');
        cy.get('[data-cy="information-page"]')
            .contains('Languages & Experience')
            .click();
        cy.get('[data-cy="information-page"]')
            .find('.list-container')
            .should('not.be.hidden');
    });

    it('Should display all components on the dashboard', () => {
        // Navigate to the dashboard by button click
        cy.get('[data-cy="navigation-left"]')
            .find('a')
            .contains('Dashboard')
            .click();

        cy.get('[data-cy="dashboard-page"]')
            .children()
            .should('have.length', 7);
    });

    it('Should display the news-feed and all collected articles', () => {
        cy.intercept('GET', '/api/news/articles?sort=DESC', {
            fixture: 'ArticlesDesc.json',
        });

        cy.intercept('GET', '/api/news/articles?sort=ASC', {
            fixture: 'ArticlesAsc.json',
        });

        // Navigate to the news feed by button click
        cy.get('[data-cy="navigation-left"]')
            .find('a')
            .contains('News Feed')
            .click();
        cy.get('[data-cy="news-feed-page"]')
            .children()
            .should('have.length', 2);
        cy.get('[data-cy="news-feed-page"]').should(
            'contain.text',
            'Last Updated:'
        );

        // Check the filter function lists outlets
        cy.get('[data-cy="all-news-filters"]').should(
            'contain.text',
            'Included Outlets'
        );

        cy.get('[data-cy="all-news-filters"]')
            .contains('Included Outlets')
            .click();

        cy.get('[data-cy="all-news-outlet-filters"]')
            .children()
            .should('have.length', 5);

        // Check the sort function changes sort type
        cy.get('[data-cy="all-news-filters"]').should(
            'contain.text',
            'Sort DESC'
        );
        cy.get('[data-cy="all-news-items"]')
            .first()
            .contains('ARTICLE_TITLE_1');

        cy.get('[data-cy="all-news-filters"]').contains('Sort DESC').click();
        cy.get('[data-cy="all-news-filters"]').should(
            'contain.text',
            'Sort ASC'
        );
        cy.get('[data-cy="all-news-items"]')
            .first()
            .contains('ARTICLE_TITLE_5');

        // Return back to the dashboard
        cy.get('[data-cy="news-feed-page"]')
            .contains('Back to Dashboard')
            .click();

        cy.url().should('include', '/dashboard');
    });

    it('Should display the API docs', () => {
        // Navigate to the documentation by button click
        cy.get('[data-cy="navigation-left"]')
            .find('a')
            .contains('Documentation')
            .click();

        cy.get('[data-cy="documentation-page"]')
            .find('iframe')
            .should('have.attr', 'src', '/api/docs');

        cy.get('[data-cy="documentation-page"]')
            .find('iframe')
            .its('0.contentDocument')
            .its('body')
            .should('contain.text', "benweare.co.uk's base API");
    });

    it('Should navigate back to the info page on clicking the title link', () => {
        // Navigate to the documentation by button click
        cy.get('[data-cy="navigation-left"]')
            .get('a.left-internal-link.inactive')
            .contains('Documentation')
            .click();

        cy.url().should('include', '/documentation');

        // Navigate to the information by title link click
        cy.get('[data-cy="navigation-top"]')
            .first()
            .get('a')
            .contains('benweare.co.uk')
            .click();

        cy.url().should('eq', 'http://localhost:3000/');
    });
});
