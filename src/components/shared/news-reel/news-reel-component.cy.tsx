import '../../../index.css';

import NewsReel from './news-reel-component';

describe('<NewsReel />', () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.intercept('GET', '/*', {});
        cy.intercept('/image.jpg', {
            fixture: 'TestImage.jpg',
        });
    });

    it('should fail to render when not supplied the endpoint and sitename', () => {
        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                {/* @ts-ignore */}
                <NewsReel siteName={undefined} endpoint={undefined} />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR: component has failed to load.'
        );
    });

    it('should fail to render when not supplied an endpoint', () => {
        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                {/* @ts-ignore */}
                <NewsReel siteName='outlet' endpoint={undefined} />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:outlet component has failed to load.'
        );
    });

    it('should fail to render when a bad endpoint is provided or a bad response occurs', () => {
        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 404,
            body: {},
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsReel siteName='outlet' endpoint='/api/news/outlet' />
            </div>
        );

        cy.get('[data-cy=error-component]').should('exist');
        cy.get('[data-cy=error-component]').should(
            'have.text',
            'ERROR:outlet component has failed to load.'
        );
    });

    it('should render a skeleton loader if the request is not yet fulfilled', () => {
        cy.mount(
            <div className='h-auto p-4'>
                <NewsReel endpoint='/api/news/outlet' siteName='outlet' />
            </div>
        );

        cy.get("[data-cy='news-reel-skeleton']").should('exist');
        cy.end();
    });

    it('should render with the correct values obtained from the API, small view', () => {
        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsReel endpoint='/api/news/outlet' siteName='outlet' />
            </div>
        );

        // Check buttons exist in small view
        cy.get('button').contains('Next').should('be.visible');
        cy.get('button').contains('Previous').should('be.visible');

        cy.get('h2').should('have.text', 'outlet');
        cy.get('h1').should('have.text', 'ARTICLE_TITLE_1');

        // Check reel can move forward
        cy.get('button').contains('Next').click();
        cy.get('h2').should('have.text', 'outlet');
        cy.get('h1').should('have.text', 'ARTICLE_TITLE_2');

        // Check reel can move back
        cy.get('button').contains('Previous').click();
        cy.get('h1').should('have.text', 'ARTICLE_TITLE_1');

        // Check reel can move rotate in a circle
        cy.get('button').contains('Previous').click();
        cy.get('h1').should('have.text', 'ARTICLE_TITLE_2');
    });

    it('should render with the page number pip, small view', () => {
        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsReel endpoint='/api/news/outlet' siteName='outlet' />
            </div>
        );

        cy.get('[data-cy="article-page-pip"]')
            .first()
            .should('have.text', '1/2');
    });

    it('should render with the correct values obtained from the API, medium view', () => {
        cy.viewport(800, 500);

        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsReel endpoint='/api/news/outlet' siteName='outlet' />
            </div>
        );

        cy.get('h1').should('have.text', 'ARTICLE_TITLE_1');

        // Check buttons exist in small view
        cy.get('button').contains('Next').should('not.be.visible');
        cy.get('button').contains('Previous').should('not.be.visible');

        // Check a pip renders for each article in the list
        cy.get('button.carousel-pip').should('have.length', 2);
        cy.get('button.carousel-pip').should('not.have.length', 1);

        // Check the rotation buttons work as desired
        cy.get('button.carousel-pip').first().should('have.class', 'active');
        cy.get('button.carousel-pip').last().should('have.class', 'inactive');

        cy.get('button.carousel-button').last().click();

        cy.get('h1').should('have.text', 'ARTICLE_TITLE_2');
        cy.get('button.carousel-pip').first().should('have.class', 'inactive');
        cy.get('button.carousel-pip').last().should('have.class', 'active');

        cy.get('button.carousel-button').first().click();

        cy.get('h1').should('have.text', 'ARTICLE_TITLE_1');
    });

    it('should render with the correct values obtained from the API, large view', () => {
        cy.viewport(1200, 500);

        cy.intercept('GET', '/api/news/outlet', {
            statusCode: 200,
            fixture: 'NewsList.json',
        });

        cy.mount(
            <div className='h-auto p-4'>
                <NewsReel endpoint='/api/news/outlet' siteName='outlet' />
            </div>
        );

        cy.get('h1').should('have.text', 'ARTICLE_TITLE_1');

        // Check buttons exist in small view
        cy.get('button').contains('Next').should('not.be.visible');
        cy.get('button').contains('Previous').should('not.be.visible');

        // Check a pip renders for each article in the list
        cy.get('button.carousel-pip').should('have.length', 2);
        cy.get('button.carousel-pip').should('not.have.length', 1);

        // Check the rotation buttons work as desired
        cy.get('button.carousel-pip').first().should('have.class', 'active');
        cy.get('button.carousel-pip').last().should('have.class', 'inactive');

        cy.get('button.carousel-button').last().click();

        cy.get('h1').should('have.text', 'ARTICLE_TITLE_2');
        cy.get('button.carousel-pip').first().should('have.class', 'inactive');
        cy.get('button.carousel-pip').last().should('have.class', 'active');

        cy.get('button.carousel-button').first().click();

        cy.get('h1').should('have.text', 'ARTICLE_TITLE_1');
    });
});
