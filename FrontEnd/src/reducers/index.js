import { combineReducers } from 'redux';

import featureFlags, * as fromFeatureFlags from './featureFlags';


const playstation = combineReducers({
  featureFlags
})

export default playstation;

export const getFeatureFlags = (state) => fromFeatureFlags.getFeatureFlags(state);
