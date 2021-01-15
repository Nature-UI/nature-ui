import React from 'react';
import Head from 'next/head';
import { Box, Button, css, Input } from '@nature-ui/core';
import { DiGithubBadge } from 'react-icons/di';

import Container from 'components/container';
import MoreStories from 'components/more-stories';
import HeroPost from 'components/hero-post';
import Intro from 'components/intro';
import Layout from 'components/layout';
import { getAllPosts } from 'lib/api';
import { CMS_NAME } from 'lib/constants';
import Post from 'types/post';
import Header from 'components/header';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const _css = css`
    min-height: 90vh;
    &::after {
      content: '';
      width: 100%;
      background-image: url('bg-1.png');
      height: 100%;
      background-position: top;
      background-repeat: no-repeat;
      margin-bottom: 1rem;
    }
  `;
  return (
    <>
      {/* <Header /> */}
      <div className={`grid place-items-center w-screen ${_css}`}>
        <Box size='md' className='text-center mt-16'>
          <h1 className='md:text-6xl font-bold text-gray-100'>
            Set of Lightview and fully customizable React Components optimized
            for <span className='text-primary-100'>TailwindCss</span>
          </h1>

          <div className='mt-12'>
            <Button
              color='gradient-button'
              size='lg'
              className='md:mr-8 shadow-gradient hover:opacity-80'
            >
              Get started
            </Button>
            <Button size='lg' color='gray-200' text='gray-100'>
              <DiGithubBadge size='2rem' className='mr-2' /> Github
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
