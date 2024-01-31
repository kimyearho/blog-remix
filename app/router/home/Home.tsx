import type { MetaFunction } from "@remix-run/node";
import MainPost from "~/components/MainPost";
import blogPost1 from '~/markdown/blog-post-1'
import blogPost2 from '~/markdown/blog-post-2'
import blogPost3 from '~/markdown/blog-post-3'

const blogPostList = [blogPost1, blogPost2, blogPost3]

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const Home = () => {
  return (
    <>
      <MainPost title="From the firehose" posts={blogPostList} />
    </>
  )
}

export default Home