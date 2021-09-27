import axios from 'axios';
import { host } from '../constants.js';
const extract = ({ data }) => data;

// temp development solution to handle CORS on client-side
const heroku = 'https://cors-anywhere.herokuapp.com/'

export const fetchFeatureFlags = async () => {
	return axios.get('/featureflags').then(extract);
};

export const setFeatureFlags = (flags) => {
	return axios.post('/featureflags', flags).then(extract);
};
