import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import moment from 'moment'

const Category = ({
  category: { slug, excerpt, author, title, publishedAt },
}) => {
  return (
    <article className="flex flex-col shadow my-4">
      
      <div className="bg-white flex flex-col justify-start p-6">
        {/* <Link href={`/post/${post.categories}`}> */}
        <span className="text-3xl font-bold hover:text-gray-700 pb-4">
          {title}
        </span>
        {/* </Link> */}
        <p className="text-sm pb-3">
          By{" "}
          <a href="#" className="font-semibold hover:text-gray-800">
            {author.current}
          </a>
          , {moment(publishedAt).format('MMM DD, YYYY')}
        </p>
        <span className="pb-6">{excerpt}</span>
        <Link href={`/post/${slug.current}`}>
          <span className="uppercase cursor-pointer text-gray-800 hover:text-black">
            Continue Reading <i className="fas fa-arrow-right"></i>
          </span>
        </Link>
      </div>
    </article>
  );
};

export default Category;
