import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';

import { styles } from 'styles/variants';
import 'styles/globals.css';
import 'styles/fonts.css';

function MyApp({ Component, pageProps }: AppProps) {
	return;
	<ThemeProvider theme={styles}>
		<RecoilRoot>
			<Component {...pageProps} />;
		</RecoilRoot>
	</ThemeProvider>;
}
export default MyApp;
