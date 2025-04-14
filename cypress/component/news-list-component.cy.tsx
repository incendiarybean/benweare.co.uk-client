import '../../src/index.css';

import NewsList from '../../src/components/shared/news-list/news-list-component';
import React from 'react';

describe('<NewsList />', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.intercept('GET', '/*', {});
        cy.intercept('/image.jpg', {
            fixture: 'TestImage.jpg',
        });
    });

    it('should fail to render when not supplied the endpoint and sitename', () => {
        cy.intercept('GET', '/api/news/all_outlets', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList siteName={undefined} endpoint={undefined} />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:News-List component has failed to load.'
        );
    });

    it('should fail to render when not supplied an endpoint', () => {
        cy.intercept('GET', '/api/news/all_outlets', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList siteName='all_outlets' endpoint={undefined} />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:all_outlets component has failed to load.'
        );
    });

    it('should fail to render when a bad endpoint is provided or a bad response occurs', () => {
        cy.intercept('GET', '/api/news/all_outlets', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList
                    siteName='all_outlets'
                    endpoint='/api/news/all_outlets'
                />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:all_outlets component has failed to load.'
        );
    });

    it('should render a skeleton loader if the request is not yet fulfilled', () => {
        cy.mount(
            <div className='h-auto p-4'>
                <NewsList
                    endpoint='/api/news/all_outlets'
                    siteName='all_outlets'
                />
            </div>
        );

        cy.get("[data-cy='news-list-skeleton']").should('exist');
    });

    it('should render with the correct values obtained from the API', () => {
        cy.intercept('GET', '/api/news/all_outlets*', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList
                    endpoint='/api/news/all_outlets'
                    siteName='all_outlets'
                />
            </div>
        );

        cy.get('h2').should('have.text', 'all_outlets');
        cy.get('a').should('have.length', 2);
        cy.get('a').first().should('have.text', 'ARTICLE_TITLE_1');
        cy.get('a').last().should('have.text', 'ARTICLE_TITLE_2');
    });

    it('should render the expanded view with the correct values from the API', () => {
        cy.intercept('GET', '/api/news/all_outlets*', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList
                    endpoint='/api/news/all_outlets'
                    siteName='all_outlets'
                    expanded
                />
            </div>
        );

        // Check articles from outlet 1 & 2 appear
        cy.get('h2').first().should('have.text', 'all_outlets');
        cy.get('a').should('have.length', 2);
        cy.get('a').first().find('h1').should('have.text', 'ARTICLE_TITLE_1');
        cy.get('a').first().find('h2').should('have.text', 'OUTLET 1');
        cy.get('a').last().find('h1').should('have.text', 'ARTICLE_TITLE_2');
        cy.get('a').last().find('h2').should('have.text', 'OUTLET 2');
    });

    it('should render the expanded and filtered view with the correct values from the API', () => {
        cy.intercept('GET', '/api/news/all_outlets*', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList
                    endpoint='/api/news/all_outlets'
                    siteName='all_outlets'
                    expanded
                    filterable
                />
            </div>
        );

        // Check articles from outlet 1 & 2 appear
        cy.get('h2').first().should('have.text', 'all_outlets');
        cy.get('a').should('have.length', 2);
        cy.get('a').first().find('h1').should('have.text', 'ARTICLE_TITLE_1');
        cy.get('a').first().find('h2').should('have.text', 'OUTLET 1');
        cy.get('a').last().find('h1').should('have.text', 'ARTICLE_TITLE_2');
        cy.get('a').last().find('h2').should('have.text', 'OUTLET 2');

        // Filter and remove all articles from OUTLET 1
        cy.get('button').contains('Included Outlets').click();
        cy.get('button').contains('OUTLET 1').click();

        // Check articles from only outlet 2 appear
        cy.get('a').should('have.length', 1);
        cy.get('a')
            .first()
            .find('h1')
            .should('not.have.text', 'ARTICLE_TITLE_1');
        cy.get('a').first().find('h2').should('not.have.text', 'OUTLET 1');
        cy.get('a').first().find('h1').should('have.text', 'ARTICLE_TITLE_2');
        cy.get('a').first().find('h2').should('have.text', 'OUTLET 2');
    });

    it('should render the expanded and filtered view with the correct values from the API with a display limit', () => {
        cy.intercept('GET', '/api/news/all_outlets*', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsList
                    endpoint='/api/news/all_outlets'
                    siteName='all_outlets'
                    expanded
                    filterable
                    limit={1}
                />
            </div>
        );

        // Check articles from outlet 1 & 2 appear
        cy.get('h2').first().should('have.text', 'all_outlets');
        cy.get('a').should('have.length', 1);
        cy.get('a').first().find('h1').should('have.text', 'ARTICLE_TITLE_1');
        cy.get('a').first().find('h2').should('have.text', 'OUTLET 1');
    });
});
