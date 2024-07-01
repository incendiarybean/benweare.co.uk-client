import * as pkg from '../../package.json';

describe('Dashboard Navigation', () => {
    // Start from the index page everytime
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Check version is correct', () => {
        cy.get('strong').contains(`v${pkg.version}`);
    });

    it('Should display the info page and image', () => {
        cy.get('img')
            .should('exist')
            .should('have.attr', 'src', '/src/common/images/profile-256.webp');

        cy.get('#information').find('.list-container').should('be.hidden');
        cy.get('#information').contains('Languages & Experience').click();
        cy.get('#information').find('.list-container').should('not.be.hidden');
    });

    it('Should display all components on the dashboard', () => {
        // Navigate to the dashboard by button click
        cy.get('#navigation-left').find('a').contains('Dashboard').click();

        cy.get('#dashboard').children().should('have.length', 7);
    });

    it('Should display the news-feed and all collected articles', () => {
        cy.intercept('GET', '/api/news/articles?sort=DESC', {
            fixture: 'articles-desc.json',
        });

        cy.intercept('GET', '/api/news/articles?sort=ASC', {
            fixture: 'articles-asc.json',
        });

        // Navigate to the news feed by button click
        cy.get('#navigation-left').find('a').contains('News Feed').click();

        cy.get('#news-feed').children().should('have.length', 2);

        cy.get('#news-feed').should('contain.text', 'Last Updated:');

        // Check the filter function lists outlets
        cy.get('#news-feed').should('contain.text', 'Included Outlets');
        cy.get('#news-feed').contains('Included Outlets').click();

        // #news-list-items > a:nth-child(1)
        cy.get(
            '#news-feed > #all-news > div > div:nth-child(2) > div:nth-child(2)'
        )
            .children()
            .should('have.length', 5);

        cy.get('#news-feed > #all-news > div > div > div > a').should(
            'have.length',
            5
        );

        // Check the sort function changes sort type
        cy.get('#news-feed').should('contain.text', 'Sort DESC');
        cy.get('#news-feed > #all-news > div > div > div > a:nth-child(1)')
            .first()
            .contains('ARTICLE_TITLE_1');

        cy.get('#news-feed').contains('Sort DESC').click();

        cy.get('#news-feed').should('contain.text', 'Sort ASC');
        cy.get('#news-feed > #all-news > div > div > div > a:nth-child(1)')
            .first()
            .contains('ARTICLE_TITLE_5');

        cy.get('#news-feed').contains('Back to Dashboard').click();
    });

    it('Should display the API docs', () => {
        // Navigate to the documentation by button click
        cy.get('#navigation-left').find('a').contains('Documentation').click();

        cy.get('#documentation')
            .find('iframe')
            .should('have.attr', 'src', '/api/docs');

        cy.get('#documentation')
            .find('iframe')
            .its('0.contentDocument')
            .its('body')
            .should('contain.text', "benweare.co.uk's base API");
    });

    it('Should navigate back to the info page on clicking the title link', () => {
        // Navigate to the documentation by button click
        cy.get('#navigation-left')
            .get('a.left-internal-link.inactive')
            .contains('Documentation')
            .click();

        cy.url().should('include', '/documentation');

        // Navigate to the information by title link click
        cy.get('#navigation-top')
            .first()
            .get('a')
            .contains('benweare.co.uk')
            .click();

        cy.url().should('eq', 'http://localhost:3000/');
    });
});
