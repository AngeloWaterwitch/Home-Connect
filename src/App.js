import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Layout from './components/Layout';
import Home from './routes/Home';
import { NewsList, NewsArticle } from './routes/News';
import Brochures from './routes/Brochures';
import Store from './routes/Store';
import Cart from './routes/Cart';
import Donate from './routes/Donate';
import Contact from './routes/Contact';
import PageHero from './components/PageHero';

const Studio = lazy(() => import('./routes/Studio'));

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/studio" element={<Suspense fallback={null}><Studio /></Suspense>} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/:slug" element={<NewsArticle />} />
          <Route path="brochures" element={<Brochures />} />
          <Route path="store" element={<Store />} />
          <Route path="cart" element={<Cart />} />
          <Route path="donate" element={<Donate />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<PageHero eyebrow="404" title="Page not found" text="That page has moved or never existed." />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
