export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export { default as IO } from './socket';
