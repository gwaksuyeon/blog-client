import axios, { AxiosRequestConfig } from 'axios';
import cookie from 'react-cookies';
import { add } from 'date-fns';

import { API_URL } from 'api/global';
import { ApiTokenUpdate } from 'api/token';
import { HTTP_CODE, ROOT_ROUTE, COOKIE_NAME } from 'common/variants';
import { saveToken, removeToken } from 'common/functions';

// 기본 인스턴스 생성 - 토큰 필요
export const AccessApi = axios.create({
	baseURL: API_URL,
});

// 토큰 업데이트
const updateAccessToken = async (
	config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
	let accessToken = cookie.load(COOKIE_NAME.ACCESS_TOKEN);
	const refreshToken = cookie.load(COOKIE_NAME.REFRESH_TOKEN);

	// accessToken 만료 && refreshToken 존재
	if (!accessToken && refreshToken) {
		const res = await ApiTokenUpdate(refreshToken);

		if (res === HTTP_CODE.UNAUTHORIZED) {
			removeToken();
			window.location.replace(ROOT_ROUTE.LOGIN);
			return config;
		}

		accessToken = res.access_token;
		cookie.save(COOKIE_NAME.ACCESS_TOKEN, accessToken, {
			path: '/',
			expires: undefined,
			httpOnly: false,
		});
	}

	if (config.headers) {
		config.headers['Authorization'] = `Bearer ${accessToken}`;
	}

	return config;
};

// 토큰 업데이트 실패
const updateAccessTokenError = (err: any) => {
	cookie.remove(COOKIE_NAME.REFRESH_TOKEN);
	return Promise.reject(err);
};

// 요청 - 성공 직전
AccessApi.interceptors.request.use(updateAccessToken, updateAccessTokenError);

// 응답 - api 요청 후
AccessApi.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		const originalRequest = error.config;

		// 401 -> 토큰 업데이트
		if (error.response.status === HTTP_CODE.UNAUTHORIZED) {
			const refreshToken = cookie.load(COOKIE_NAME.REFRESH_TOKEN);

			const res = await ApiTokenUpdate(refreshToken);

			// refresh 없을 때
			if (res === HTTP_CODE.UNAUTHORIZED || !res.access_token) {
				removeToken();
				window.location.replace(ROOT_ROUTE.LOGIN);
				return;
			}

			// 토큰 업데이트 성공
			saveToken(res.access_token, res.refresh_token);

			originalRequest.headers.Authorization = `Bearer ${res.access_token}`;

			return AccessApi(originalRequest);
		}

		return Promise.reject(error);
	},
);

// 기본 인스턴스 생성 - 토큰 필요 x
export const Api = axios.create({
	baseURL: API_URL,
});
