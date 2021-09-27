import { FETCH_FEATUREFLAGS_SUCCESS } from '../types';



export default function featureFlags(state = [], action) {
	switch (action.type) {
		case FETCH_FEATUREFLAGS_SUCCESS:
			return action.payload
		default:
			return state;
	}
}

export const getFeatureFlags = (state) => {
	return state.featureFlags
}
