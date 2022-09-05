import React from "react";
import { client } from "../lib/client";
import Link from "next/link";
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {BsFilter} from 'react-icons/bs'
const categories =[
  {name:'Technology', slug:'technology'},
  {name:'Politics', slug:'politics'},
  {name:'Sports', slug:'sports'},
]

const Header = () => {
  return (
    <>

<header className="text-gray-600 body-font shadow-md">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
    {categories?.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="hover:bg-gray-400 hover:text-white font-semibold rounded py-2 mx-2 cursor-pointer">
                {category.name}
              </span>
              </Link>
            ))}

    </nav>
    <Link href="/">
      <div className="flex order-first lg:order-first lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <span className="ml-3 text-xl font-extrabold">PHORX</span>
      </div>
    </Link>
  </div>
</header>
    </>
  );
};

export default Header;
export const getServerSideProps = async()=>{
  const queryCategory = '*[_type == "category"]'
  const categories = await client.fetch(queryCategory)

  return{
    props:{categories}
  }
}