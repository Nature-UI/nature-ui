import React from 'react';
import '../src/scss/base.scss';

const Layout = ({ children }) => {
	return <div className='px-20 py-10'>{children}</div>;
};

export default Layout;
