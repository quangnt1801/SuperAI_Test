import { combineReducers } from 'redux';
import { ROOT_STATE } from '../sagas/rootSaga';
import AuthenticationReducer from './AuthenticationReducer';

const allReducers = combineReducers<ROOT_STATE>({
    authentication: AuthenticationReducer
});

export default allReducers;