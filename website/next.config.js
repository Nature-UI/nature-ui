const { execa } = require('execa');
const path = require('path');

const withPlugins = require('next-compose-plugins');
const withMdx = require('next-mdx-enhanced');
const { Octokit } = require('@octokit/rest');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const fromUnixTime = require('date-fns/fromUnixTime');
const format = require('date-fns/format');
const { getEditUrl, addLeadingSlash } = require('@docusaurus/utils');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const getUserData = async (username) => {
  try {
    const { data } = await octokit.users.getByUsername({ username });

    const {
      avatar_url: avatarUrl,
      html_url: githubUrl,
      blog: websiteUrl,
      bio,
      name,
      twitter_username: twitterUsername,
    } = data;

    return {
      login: username,
      avatarUrl,
      githubUrl,
      websiteUrl,
      bio,
      name,
      twitterUsername,
    };
  } catch {}
};

const EDIT_URL =
  'https://github.com/nature-ui/nature-ui/edit/develop/website/pages';

/**
 * Gets the last edited timestamp and author from git
 * using `git log`
 *
 * %an = author name
 * %ct = committer date, UNIX timestamp
 */
const getLastEdited = async (filePath) => {
  try {
    const { stdout } = await execa('git', [
      'log',
      '-1',
      '--format=%ct, %an',
      '--follow',
      '--',
      filePath,
    ]);

    return getTimestampAndAuthor(stdout);
  } catch {}
};

const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/;

/**
 * Format the latest edited timestamp and author from
 * git output
 * @param {string} str
 */
const getTimestampAndAuthor = (str) => {
  if (!str) return null;

  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX);

  if (!temp || temp.length < 3) return null;

  const [_, timestamp, author] = temp;
  const dateStr = fromUnixTime(+timestamp);

  return {
    date: format(dateStr, 'MMMM dd, yyyy'),
    author,
  };
};

const fileToPath = (str) => {
  return addLeadingSlash(str.replace('.mdx', ''));
};

const defaultConfig = {
  target: 'serverless',
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, 'sharp'],
  }),
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
};

const mdxConfig = {
  layoutDir: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-autolink-headings'),
    require('remark-emoji'),
    require('remark-images'),
    require('remark-slug'),
    require('remark-toc'),
    require('remark-unwrap-images'),
  ],
  extendFrontMatter: {
    process: async (_, matter) => {
      console.log({ matter });
      const { __resourcePath: mdxPath, author, tags } = matter;

      // Read the file path
      const filePath = path.join(process.cwd(), 'pages', mdxPath);

      // get the last edited author and date
      const lastEdited = await getLastEdited(filePath);

      // get the edit url
      const editUrl = getEditUrl(mdxPath, EDIT_URL);

      // get the slug
      const slug = fileToPath(mdxPath);

      // If frontMatter includes author, add the author's data
      const authorData = author ? await getUserData(author) : undefined;

      return {
        slug,
        lastEdited,
        editUrl,
        auth: authorData,
        tags,
      };
    },
  },
};

module.exports = withPlugins(
  [withBundleAnalyzer, withMdx(mdxConfig)],
  defaultConfig,
);
