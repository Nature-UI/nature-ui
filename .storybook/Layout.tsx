import React from 'react';
// import '../src/scss/base.scss';
import '!style-loader!css-loader!sass-loader!../src/scss/tailwind.scss';

const Layout = ({ children }) => {
  return <div className='px-6 py-6'>{children}</div>;
};

export default Layout;
