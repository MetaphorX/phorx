import moment from "moment";
import { client, urlFor } from "../../lib/client";
import BlockContent from '@sanity/block-content-to-react'
import {ImFacebook2, ImMail, ImPinterest, ImTwitter} from 'react-icons/im'

const PostDetail = ({title,author,mainImage,category,body, publishedAt}) => {
    
  return (
    <div className="container mx-auto flex flex-wrap py-6">
      <section className="w-full md:w-2/3 flex flex-col items-center px-3">
        <article className="flex flex-col shadow my-4">
          <span>
            <img src={urlFor(mainImage && mainImage)} 
                alt={title}
                
            /> 
          </span>
          <div className="bg-white flex flex-col justify-start p-6">
            <span
              className="text-blue-700 text-sm font-bold uppercase pb-4"
            >
              {category?.name}
            </span>
            <span href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
              {title}
            </span>
            <p href="#" className="text-sm pb-8">
              By{" "}
              <span href="#" className="font-semibold hover:text-gray-800">
                {author?.name}
              </span>
              , Published on {moment(publishedAt).format('MMM DD, YYYY')}
            </p>
            <div className="block pb-3">
              <BlockContent blocks={body}  projectId="1tp8p6cf" dataset="production"/>
            </div>
          </div>
        </article>

        <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
          <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
            <img src={urlFor(author.image && author.image)}
              className="rounded-full shadow h-32 w-32"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center md:justify-start">
            <p className="font-semibold text-2xl">{author.name}</p>
            <p className="pt-2">              <BlockContent blocks={author.bio}  projectId="1tp8p6cf" dataset="production"/>
            </p>
            <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
              <ImFacebook2 className="cursor-pointer"/>
              <ImTwitter className="cursor-pointer ml-2"/>
              <ImMail className="cursor-pointer ml-2"/>
              <ImPinterest className="cursor-pointer ml-2"/>
              
            </div>
          </div> 
        </div>
      </section>

      {/* <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
        <div className="w-full bg-white shadow flex flex-col my-4 p-6">
          <p className="text-xl font-semibold pb-5">About Us</p>
          <p className="pb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In
            hac habitasse platea dictumst.
          </p>
          <a
            href="#"
            className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
          >
            Get to know us
          </a>
        </div>

        
      </aside> */}
    </div>
  );
};

export default PostDetail;

// export const getStaticPaths = async()=>{
//     const query = `*[_type == "post"]{
//         slug{
//             current
//         }
//     }`
//     const posts = await client.fetch(query)
//     const paths = posts.map((post) =>({
//          params:{
//             slug: post.slug.current
//          }
//     }))

//     return{
//         paths,
//         fallback: 'blocking'
//     }
// }

// export const getStaticProps = async({params:{slug}})=>{
//     const query = `*[_type == "post" && slug.current == '${slug}'][0]`
//     const post = await client.fetch(query)
  

//     return{
//       props:{post}
//     }
//   }
export const getServerSideProps = async(pageContext) =>{
  const pageSlug = pageContext.query.slug
  
  const query = `*[_type == "post" && slug.current == $pageSlug][0]{
    title,
    category->{
      name,
    },
    body,
    mainImage,
    author->{
      name,
      slug,
      image,
      bio
    }
  }`

  const post = await client.fetch(query,{pageSlug})
  if(!post){
    return{
      props:null,
      notFound: true
    }
  }else{
    return{
      props:{
        title: post.title,
        body:post.body,
        category:post.category,
        author:post.author,
        mainImage:post.mainImage
      }
    }
  }

}