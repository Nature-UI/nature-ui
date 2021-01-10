import loadMDXFromPages from 'utils/load-mdx-dir';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: String[];
  readTimeMinutes: number;
};

const byDateDesc = (a: BlogPost, b: BlogPost) => {
  const bTime = new Date(b.date).getTime();
  const aTime = new Date(a.date).getTime();

  return bTime - aTime;
};

export const getBlogPosts = async () => {
  const mdxData = await loadMDXFromPages('blog');
  return mdxData
    .map((blogPostData) => ({
      ...blogPostData,
      slug: blogPostData.slug.replace(/\/index$/, ''),
      author: blogPostData.author ?? null,
      date: new Date(blogPostData.date).toISOString(),
      tags: Array.isArray(blogPostData.tags) ? blogPostData.tags : [],
    }))
    .sort(byDateDesc);
};
