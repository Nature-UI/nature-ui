import { createExcerpt, parseMarkdownFile } from '@docusaurus/utils';
import siteConfig from 'configs/site-config';
import path from 'path';
import shell from 'shelljs';
import { calcReadTime } from 'utils/calc-read-time';

const loadMDXFromPages = async (mdxDir = 'docs') => {
  const { processFrontMatter } = require('utils/mdx-utils');

  const dir = path.join(process.cwd(), 'pages', mdxDir);
  const filenames = shell.ls('-R', `${dir}/**/*.mdx`);

  const dataPromise = filenames.map(async (filename: string) => {
    // get the `pages` directory
    const pagesDir = path.join(process.cwd(), 'pages');

    // gets the relative mdx path
    // pages/docs/guides.mdx => /docs/guides.mdx
    const mdxPath = path.relative(pagesDir, filename);

    // extract frontMatter and content from markdown string
    const { frontMatter, content } = await parseMarkdownFile(filename);

    // extends frontMatter with more useful information
    return processFrontMatter({
      ...frontMatter,
      path: mdxPath,
      baseEditUrl: siteConfig.repo.editUrl,
      excerpt: frontMatter.excerpt || createExcerpt(content),
      readTimeMinutes: calcReadTime(content),
    });
  });

  const data = await Promise.all(dataPromise);

  return data;
};

export default loadMDXFromPages;
