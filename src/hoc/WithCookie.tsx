import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'utils/cookie';

import type { PropsWithChildren } from 'react';

import CookieBanner from 'components/CookieBanner';

interface ICookieContext {
	acceptCookie: () => void;
	clearCookie: () => void;
}

export const CookieContext = createContext<ICookieContext>({} as ICookieContext);

interface IWithCookieProps extends PropsWithChildren {}

const cookieName = 'cookie_approve';

function WithCookie({ children }: IWithCookieProps): JSX.Element {
	const [cookieBannerIsVisible, setCookieBannerIsVisible] = useState(false);

	useEffect(() => {
		if (!getCookie(cookieName)) {
			setCookieBannerIsVisible(true);
		}
	}, []);

	const acceptCookie = () => {
		setCookie(cookieName, 'true', 30);
		setCookieBannerIsVisible(false);
	};

	const clearCookie = () => {
		const cookies = document.cookie.split(';');
		cookies.forEach(cookie => {
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		});

		setCookieBannerIsVisible(true);
	};

	return (
		<CookieContext.Provider value={{ acceptCookie, clearCookie }}>
			{children}
			<CookieBanner isVisible={cookieBannerIsVisible} />
		</CookieContext.Provider>
	);
}

export default WithCookie;
