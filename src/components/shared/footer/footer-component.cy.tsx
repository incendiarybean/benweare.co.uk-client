import '../../../index.css';

import FooterComponent from './footer-component';

describe('<FooterComponent />', () => {
    it('should render without any props', () => {
        cy.mount(<FooterComponent />);
    });
});
