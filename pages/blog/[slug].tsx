import Layout from '@components/Layout'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { GetStaticProps, NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import React from 'react'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import { unified } from 'unified'


const Post: NextPage<{ post: string, data: any }> = ({post, data}) => {
  const router = useRouter()
  console.log(router.query);
  console.log(data);
  

  return (
    <Layout title={data.title}>
      <h1 className='text-5xl font-semibold mt-2'>blog</h1>
      <div 
        className='blog-post-content'
        dangerouslySetInnerHTML={{__html: post}} 
      />
    </Layout>
  )
}

export async function getStaticPaths() {

  const blogPosts = readdirSync("./posts").map( file => {
    const [slug, _] = file.split('.');
    return {slug};
  })

  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug }, //url id 와 일치해야됨 slug
  }))

  console.log(paths);
  

  return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async (context) => {
console.log("context", context);

const { data, content } = matter.read(`./posts/${context?.params?.slug}.md`);

// npm i unified remark-parse remark-html
const { value } = await unified()
  .use(remarkParse)
  .use(remarkHtml)
  .process(content);

console.log(value);


return {
  props: {
    data,
    post: value
  },
}
}



export default Post
