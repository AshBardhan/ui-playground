import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from '@/mocks/server';

global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
	constructor(public callback: IntersectionObserverCallback) {}
	observe() {
		// Immediately trigger the callback with a mock entry
		this.callback(
			[
				{
					isIntersecting: true,
					intersectionRatio: 1,
					boundingClientRect: {} as DOMRectReadOnly,
					intersectionRect: {} as DOMRectReadOnly,
					rootBounds: null,
					target: document.createElement('div'),
					time: Date.now(),
				},
			] as IntersectionObserverEntry[],
			this as unknown as IntersectionObserver
		);
	}
	unobserve() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
	readonly root = null;
	readonly rootMargin = '';
	readonly thresholds = [];
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
