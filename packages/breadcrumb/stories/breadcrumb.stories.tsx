import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '../src';

export default {
  title: 'Breadcrumb',
};

export const Default = () => (
  <BrowserRouter>
    <Breadcrumb spacing={8}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to='/' replace>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href='https://www.github.com/dnature' target='_blank'>
          About
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrent>
        <BreadcrumbLink
          href='https://contact-divine.netlify.app/contact'
          target='_blank'
        >
          Contact
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  </BrowserRouter>
);

export const Separator = () => (
  <Breadcrumb separator='>'>
    <BreadcrumbItem>
      <BreadcrumbLink href='#'>Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href='#'>About</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrent>
      <BreadcrumbLink href='#'>Current</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);
