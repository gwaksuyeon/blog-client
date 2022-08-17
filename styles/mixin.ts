import { css } from 'styled-components';

// 말줄임
export const Ellipsis = (clamp: number) => css`
	display: -webkit-box;
	text-overflow: ellipsis;
	-webkit-line-clamp: ${clamp};
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	overflow: hidden;
`;
