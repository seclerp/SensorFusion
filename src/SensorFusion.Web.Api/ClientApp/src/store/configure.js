import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const configureStore = (preloadedState) => {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  );

  return store
};

export default configureStore; 