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

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const _css = css`
    height: 90vh;
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
      <div className='w-screen bg-gradient-line h-2' />
      <Box size='xl' className='mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center mr-8'>
            <img src='favicon.png' alt='Nature UI Logo' />
            <h2 className='text-3xl font-bold text-gray-100 w-full'>
              Nature UI
            </h2>
          </div>
          <div className='md:w-3/5 flex items-center justify-end'>
            <Input placeholder='Search the docs' className='flex-1 mx-6' />
            <DiGithubBadge size='2rem' className='ml-14 mr-2' />
            <DiGithubBadge size='2rem' className='mr-2' />
            <DiGithubBadge size='2rem' className='mr-2' />
          </div>
        </div>
      </Box>
      <div className={`grid place-items-center w-screen ${_css}`}>
        <Box size='md' className='text-center mt-16'>
          <h1 className='text-6xl font-bold text-gray-100'>
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
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
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
