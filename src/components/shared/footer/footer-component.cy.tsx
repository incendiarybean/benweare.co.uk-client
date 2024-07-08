import '../../../index.css';

import * as pkg from 'package.json';

import FooterComponent from './footer-component';

describe('<FooterComponent />', () => {
    it('should render without any props', () => {
        cy.mount(<FooterComponent />);
    });

    it('should render with the correct version number', () => {
        cy.mount(<FooterComponent />);

        const package_version =
            VITE_APP_VERSION ??
            JSON.stringify(process.env.npm_package_version) ??
            process.env.VITE_APP_VERSION ??
            pkg.version;

        cy.get('[data-cy="version-number"]').should(
            'contain.text',
            `v${package_version}`
        );
    });
});
