import React from "react";
import { client } from "../lib/client";
import Link from "next/link";

const categories =[
  {name:'Technology', slug:'technology'},
  {name:'Automotive', slug:'automotive'},
  {name:'Politics', slug:'politics'},
  {name:'Culture', slug:'culture'},
  {name:'Sports', slug:'sports'},
]

const Header = () => {
  return (
    <>

      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-6">
          <Link href="/">
            <p className="font-bold text-gray-800 uppercase cursor-pointer hover:text-gray-500 text-5xl">
            Phorx
            </p>
          </Link>
          <p className="text-lg text-gray-600">Lorem Ipsum Dolor Sit Amet</p>
        </div>
      </header>

      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <div className="block sm:hidden">
          <a href="#"
            className="block md:hidden text-base font-bold uppercase text-center justify-center items-center"
          >
            Category <i className="fas ml-2"></i>
          </a>
        </div>
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            {categories?.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="hover:bg-gray-400 rounded py-2 px-4 mx-2 cursor-pointer">
                {category.name}
              </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
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