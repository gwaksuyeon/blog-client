import cookie from 'react-cookies';
import { isMobile } from 'react-device-detect';
import { add, sub, format } from 'date-fns';

import {
	HTTP_CODE,
	PC_TOKEN_PERIOD,
	MOBILE_TOKEN_PERIOD,
	COOKIE_NAME,
} from 'common/variants';

// API - 성공, POST/DELETE/PUT
export const apiSuccess = (res: any) => {
	return res.data.ret_code;
};

// API - 성공, GET
export const apiSuccessData = (res: any) => {
	return res.data;
};

// API - 실패
export const apiError = (err: any) => {
	if (err.response) {
		if (err.response.status === HTTP_CODE.BAD_REQUEST) {
			return err.response.data.ret_code || HTTP_CODE.BAD_REQUEST;
		}

		return err.response.status;
	}

	return HTTP_CODE.BAD_REQUEST;
};

// 토큰 저장
export const saveToken = (accessToken: string, refreshToken: string) => {
	const expires = add(new Date(), {
		days: isMobile ? MOBILE_TOKEN_PERIOD : PC_TOKEN_PERIOD,
	});

	cookie.save(COOKIE_NAME.ACCESS_TOKEN, accessToken, {
		path: '/',
		expires: undefined,
	});

	cookie.save(COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
		path: '/',
		expires: undefined,
	});
};

// 토큰 삭제
export const removeToken = () => {
	cookie.remove(COOKIE_NAME.ACCESS_TOKEN, { path: '/' });
	cookie.remove(COOKIE_NAME.REFRESH_TOKEN, { path: '/' });
};

// 100단위 comma
export const commaNumber = (num: number) => {
	if (num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	return '0';
};

// id 마스킹 처리
export const idMarsking = (id: string) => {
	if (id) {
		const startId = id.slice(0, 2);
		return `${startId}${'*'.repeat(id.length - 2)}`;
	}

	return '';
};

// 날짜 변환
export const timeForToday = (date: string) => {
	if (date) {
		const today = new Date();
		const UTC_TIME = today.getTime() + today.getTimezoneOffset() * 60 * 1000;
		const KST_TIME_DIFF = 9 * 60 * 60 * 1000;
		const KST_TIME = new Date(UTC_TIME + KST_TIME_DIFF);

		const value = sub(new Date(date), { hours: 9 }); // 비교일, 한국시간에 맞춰 9시간 계산

		const milliSeconds = KST_TIME.getTime() - value.getTime();
		const seconds = Math.floor(milliSeconds / 1000);
		const minute = Math.floor(seconds / 60);

		if (minute < 1) {
			return '지금';
		}
		if (minute < 60) {
			return `${minute}분 전`;
		}

		const hour = Math.floor(minute / 60);
		if (hour < 24) {
			return `${hour}시간 전`;
		}

		const day = Math.floor(hour / 24);
		if (day < 3) {
			return `${day}일 전`;
		}

		return format(new Date(value), 'yyyy.MM.dd');
	}
	return `${date}`;
};

// 휴대폰 형식
export const phoneNumberFormat = (phone: string) => {
	if (phone) {
		return phone.replace(
			/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
			'$1-$2-$3',
		);
	}

	return '';
};

// value값으로 key값 찾기
export const getKeyByValue = (object: any, value: any) => {
	if (object && value) {
		const res = Object.keys(object).find((key) => object[key] === value);
		return res ? res : '';
	}
	return '';
};

// 생일 format
export const birthdayFormat = (birth: string) => {
	if (birth) {
		if (birth.includes('-')) {
			// yyMMdd
			return birth.substring(2).replace(/-/gi, '');
		}

		return birth;
	}

	return birth;
};
