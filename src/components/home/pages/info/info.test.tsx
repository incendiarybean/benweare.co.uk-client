import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import Component from './info';

jest.mock('socket.io-client', () => ({
    io: () => ({
        on: jest.fn(),
    }),
}));
jest.mock('@common/images/profile-sm.webp');
jest.mock('@common/constants', () => ({
    VITE_APP_VERSION: '0.2.0',
    VITE_APP_DOCS_URL: 'http://testurl.com',
}));

test('Name and image displays', () => {
    render(<Component />);
    const name = screen.getByText(/Ben Weare/i);
    expect(name).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
});

test('Dropdown display of knowledge works.', () => {
    render(<Component />);

    const expandButton = screen.getByText(/Languages & Experience/i);
    const knowledgeTitle = screen.getByText(/Services\/Environment/i);

    expect(knowledgeTitle).toHaveProperty('hidden');

    act(() => expandButton.click());

    expect(knowledgeTitle).toBeInTheDocument();
});
