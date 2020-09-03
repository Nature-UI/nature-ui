import React from 'react';
import { addDecorator } from '@storybook/react';
import Layout from './Layout';

addDecorator((storyFn) => <Layout>{storyFn()}</Layout>);
