import '../../../index.css';

import Card from './card-component';
import { sleep } from '@common/utils';

describe('<Card />', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.intercept('GET', '/*', {});
    });

    it('should fail to render when not supplied the endpoint and sitename', () => {
        cy.intercept('GET', '/api/news/outlet_1', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                {/* @ts-ignore */}
                <Card siteName={undefined} endpoint={undefined} />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR: component has failed to load.'
        );
    });

    it('should fail to render when not supplied an endpoint', () => {
        cy.intercept('GET', '/api/news/outlet_1', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                {/* @ts-ignore */}
                <Card siteName='outlet_1' endpoint={undefined} />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:outlet_1 component has failed to load.'
        );
    });

    it('should fail to render when a bad endpoint is provided or a bad response occurs', () => {
        cy.intercept('GET', '/api/news/outlet_1', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                <Card siteName='outlet_1' endpoint='/api/news/outlet_1' />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:outlet_1 component has failed to load.'
        );
    });

    it('should render a skeleton loader if the request is not yet fulfilled', () => {
        cy.intercept('GET', '/api/news/outlet_1', async (_req) => {
            await sleep(10000);
        });

        cy.mount(
            <div className='h-auto p-4'>
                <Card endpoint='/api/news/outlet_1' siteName='outlet_1' />
            </div>
        );

        cy.get("[data-cy='card-skeleton']").should('exist');
        cy.end();
    });

    it('should render with the correct values obtained from the API', () => {
        cy.intercept('GET', '/api/news/outlet_1', {
            statusCode: 200,
            fixture: 'Card.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <Card endpoint='/api/news/outlet_1' siteName='outlet_1' />
            </div>
        );

        cy.get("[data-cy='card-component']").should('exist');
        cy.get('h2').should('have.text', 'outlet_1');
        cy.get('h1').should('have.text', 'ARTICLE_TITLE');

        cy.get('p').should('not.exist');
        cy.get('button').contains('Read the Article').click();
        cy.get('p').should('have.text', 'ARTICLE_DESCRIPTION');
        cy.get('button').contains('Read the Article').click();
        cy.get('p').should('not.exist');
    });
});
