import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const KEY = 'hc-cart-v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: Math.min((state[action.id] || 0) + 1, 20) };
    case 'set': {
      const next = { ...state };
      if (action.qty <= 0) delete next[action.id];
      else next[action.id] = Math.min(action.qty, 20);
      return next;
    }
    case 'clear':
      return {};
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count: Object.values(items).reduce((a, b) => a + b, 0),
      add: (id) => dispatch({ type: 'add', id }),
      setQty: (id, qty) => dispatch({ type: 'set', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
