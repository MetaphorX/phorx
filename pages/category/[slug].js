import React from 'react'
import moment from "moment";

import { client } from '../../lib/client'

const CategoryList = ({postCategories}) => {
    

    return (
        <section>

        <div className="container mx-auto flex flex-wrap py-6">
        <div className="w-full md:w-2/3 flex flex-col items-center px-3">
         <h1 className='text-center text-4xl font-bold'> Categories Coming soon</h1>
        </div>
        
        </div>
        
      </section>
  )
}

export default CategoryList

export const getServerSideProps = async(pageContext)=>{
    
    const pageSlug = pageContext.query.slug

    const query = `*[_type == 'post' && category->name == $pageSlug][0]`
    const postCategories = await client.fetch(query,{pageSlug})
  
    return{
      props:{postCategories}
    }
  }

