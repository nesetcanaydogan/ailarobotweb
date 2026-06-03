import '@testing-library/jest-dom';

// Mock ResizeObserver for R3F
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Mock IntersectionObserver
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() { return []; }
}

window.IntersectionObserver = IntersectionObserver as any;
