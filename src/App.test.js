import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./components/NetworkScene', () => () => null);
jest.mock('./routes/Studio', () => () => null);
jest.mock('gsap', () => {
  const noop = () => ({ revert() {}, kill() {} });
  const g = {
    registerPlugin: () => {},
    matchMedia: () => ({ add: () => {}, revert: () => {} }),
    context: noop,
    from: () => {},
    to: () => {},
    fromTo: () => {},
    utils: { toArray: () => [] },
  };
  return { __esModule: true, default: g };
});
jest.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));

beforeAll(() => {
  window.scrollTo = () => {};
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
});

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test('home renders the headline', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/every neighbour/i);
});

test('store lists products and cart is reachable', () => {
  renderAt('/store');
  expect(screen.getByText(/connect tote bag/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /cart, 0 items/i })).toBeInTheDocument();
});

test('unknown route shows 404', () => {
  renderAt('/nope');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/not found/i);
});
