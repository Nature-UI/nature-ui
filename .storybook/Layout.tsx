import React from 'react';
// import '../src/scss/base.scss';
import '!style-loader!css-loader!sass-loader!../src/scss/base.scss';

const Layout = ({ children }) => {
  return <div className='px-20 py-40'>{children}</div>;
};

export default Layout;
