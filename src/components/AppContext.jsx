import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { reducer, initialState } from './Functions/reducer';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('state'))) {
      dispatch({
        type: 'init_stored',
        payload: { value: JSON.parse(localStorage.getItem('state')) },
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('state', JSON.stringify(state));
    }
  }, [state]);
  const contextValue = { state, dispatch, loading, setLoading };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
