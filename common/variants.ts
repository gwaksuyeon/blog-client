export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN;

export const MOBILE_WIDTH = 360;
export const TABLET_WIDTH = 768;
export const PC_WIDTH = 1024;

export const ID_REG = /(?=.*?[a-z])^[a-z0-9]{1}[A-Za-z0-9]{4,15}$/;
export const EMAIL_REG =
	/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
export const PASSWORD_REG = /^[a-z0-9_-]{8,16}$/;
export const SPACE_REG = /\s/gi;
export const ONLY_NUMBER_REG = /^[0-9]+$/;

export const MOBILE_TOKEN_PERIOD = 90;
export const PC_TOKEN_PERIOD = 7;

// 개발 환경
export const ENV_MODE = {
	PROD: 'prod',
	DEV: 'dev',
};

export const ROOT_ROUTE: any = {
	HOME: '/',
};

export const HTTP_CODE = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
};

// cookie명
export const COOKIE_NAME = {
	ACCESS_TOKEN: 'accessToken', // 엑세스 토큰
	REFRESH_TOKEN: 'refreshToken', // 리프레쉬 토큰
};
