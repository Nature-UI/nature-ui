import React from 'react';
import '!style-loader!css-loader!../src/css/tailwind.css';
// import '!style-loader!css-loader!../src/css/base.css';
import { Container } from '@nature-ui/container';

const Layout = ({ children }) => {
  return (
    <Container size='lg' className='mt-6'>
      {children}
    </Container>
  );
};

export default Layout;
