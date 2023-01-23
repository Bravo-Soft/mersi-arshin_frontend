import type { LinkProps } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const LinkBehavior = forwardRef<
	HTMLAnchorElement,
	Omit<LinkProps, 'to'> & { href: LinkProps['to'] }
>((props, ref) => {
	const { href, ...other } = props;
	return <Link ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
