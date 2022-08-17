import { MOBILE_WIDTH, TABLET_WIDTH, PC_WIDTH } from 'common/variants';

export const styles = {
	mobile: `(min-width: ${MOBILE_WIDTH}px)`,
	tablet: `(min-width: ${TABLET_WIDTH}px)`,
	pc: `(min-width: ${PC_WIDTH}px)`,
};
