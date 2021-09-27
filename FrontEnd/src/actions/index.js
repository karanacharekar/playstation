import * as api from '../apis';
import * as types from '../types';
import axios from 'axios';

export const fetchFeatureFlags = () => (dispatch, getState) =>
	api.fetchFeatureFlags().then(
		(response) => {
			dispatch({
				type: types.FETCH_FEATUREFLAGS_SUCCESS,
				payload: response
			});
		},
		(error) => {
			dispatch({
				type: types.FETCH_FEATUREFLAGS_FAILURE,
				error
			});
		}
	);


	export const setFeatureFlags = (flags) => (dispatch, getState) => {
	  return api.setFeatureFlags(flags).then(
	    response => {
	      dispatch({
	        type: types.SET_FEATUREFLAGS_SUCCESS
	      });
	      return response;
	    },
	    error => {
	      dispatch({
	        type: types.SET_FEATUREFLAGS_FAILURE,
	        error
	      });
	      throw error;
	    }
	  );
	};
