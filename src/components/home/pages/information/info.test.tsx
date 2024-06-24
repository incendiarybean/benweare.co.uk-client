import '@testing-library/jest-dom';

import { act, render, screen, waitFor } from '@testing-library/react';

import Component from './information';

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

let OriginalImage: typeof Image;
beforeAll(() => {
    OriginalImage = global.Image;
});
afterAll(() => {
    global.Image = OriginalImage;
});

test('Name and image displays', async () => {
    // we'll keep a reference to any load handler
    // passed by the component
    let onloadHandler: (() => void) | undefined = undefined;
    class MockImage {
        set onload(handler: () => void) {
            // pass the handler to our test's reference
            onloadHandler = handler;
        }
    }
    // @ts-ignore
    global.Image = MockImage;

    render(<Component />);

    expect(onloadHandler).toBeDefined();

    act(() => {
        onloadHandler!();
    });

    const name = screen.getByText(/Ben Weare/i);
    expect(name).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
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
