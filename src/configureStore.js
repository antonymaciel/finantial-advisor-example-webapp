import { createStore } from 'redux';
import reducers from './reducers';

const configureStore = () => createStore(reducers);

export default configureStore;

