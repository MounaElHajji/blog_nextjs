import React from 'react'
import { getPosts, getPostDetails} from '../../services'
import  PostDetail  from '../../components/PostDetail'
import  Categories  from '../../components/Categories'
import  Author  from '../../components/Author'
import  Comments  from '../../components/Comments'
import  CommentsForm  from '../../components/CommentsForm'
import  PostWidget  from '../../components/PostWidget'
import Loader from '../../components/Loader'
import { useRouter } from 'next/router'

const PostDetails  = ({post}) => {
  const router = useRouter();

  if(router.isFallback) {
    return <Loader />
  }

  console.log(post);
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
            <PostDetail post={post}/>
            <Author author={post.author}/>
            <CommentsForm slug={post.slug}/>
            <Comments slug={post.slug}  />
        </div>
        <div className='col-span-1 lg:col-span-4'>
            <div>
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories />
            </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails 


//getting the data of a specific post
export async function getStaticProps({params}) {
  const data = (await getPostDetails(params.slug)) || [];

  return {
    props : {post: data}
  }
}


//we need to let our application knows all the possible paths that we can go to
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })) ,
    fallback: false
  }
}