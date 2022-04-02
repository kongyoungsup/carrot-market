import Layout from '@components/Layout'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface Post{
  title: string;
  date: string;
  category: string;
  slug: string;
}
const Blog: NextPage<{posts : Post[]}> = ({posts}) => {

  console.log(posts);
  
  return (
    <Layout title='blog'>
      <h1 className='text-5xl font-semibold mt-2'>blog</h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/blog/${post?.slug}`}>
          <a>
            <div  className="mb-5 mt-4">
              <span className="text-lg text-red-500 ">{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </div>
          </a>
        </Link>
        
      ))}
    </Layout>
  )
}

export async function getStaticProps() {

    // intstall front matter ( npm install --save grey-matter )
  const blogPosts = readdirSync("./posts").map( file => {
    const contents = readFileSync(`./posts/${file}`, "utf-8")
    const [slug, _] = file.split('.');
    return {...matter(contents).data, slug};
  })

  return {
    props: {
      posts: blogPosts
    },
  }
}

export default Blog