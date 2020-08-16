import React from 'react';
// import '../src/scss/base.scss';
import '!style-loader!css-loader!sass-loader!../src/scss/tailwind.scss';
import Container from '@nature-ui/container';

const Layout = ({ children }) => {
  return (
    <Container size='xs' className='px-12 mt-6'>
      {children}
    </Container>
  );
};

export default Layout;
