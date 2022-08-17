import axios from 'axios';

import { API_TOKEN_UPDATE } from 'api/global';
import { apiError, apiSuccessData } from 'common/functions';

export const ApiTokenUpdate = async (refreshToken: string) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
	const res = await axios
		.get(API_TOKEN_UPDATE)
		.then((response) => {
			return apiSuccessData(response);
		})
		.catch((err) => {
			return apiError(err);
		});

	return res;
};
