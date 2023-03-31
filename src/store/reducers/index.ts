import { combineReducers } from 'redux';

const applicationReducer = combineReducers({
  // TODO: Add reducers here
});
const rootReducers = (state: any, action: any) => applicationReducer(state, action);

export default rootReducers;
