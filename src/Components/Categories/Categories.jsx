import React, { useEffect, useState } from 'react';
import './Categories.module.css';
import Loading from '../Loading/Loading';
import axios from 'axios';
import $ from 'jquery';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function getSubCategories(cId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${cId}/subcategories`);
      setSubCategories(data.data);
      setSelectedCategory(cId); 

      const offset = $('#subcategories-section').offset().top - 100;

      $('html, body').animate({
        scrollTop: offset
      }, 800);

    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div className='pt-24'>
      <h2 className='text-green-600 text-4xl text-center my-3'>Categories</h2>

      <div className="grid gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
        {categories.length > 0 ? (
          categories.map(category => (
            <div
              key={category._id}
              onClick={() => getSubCategories(category._id)}
              className='group hover:shadow-green-500 shadow-lg overflow-hidden cursor-pointer'
            >
              <img
                className="w-full h-auto max-w-full object-cover sm:h-64 md:h-80 lg:h-96 block"
                src={category.image}
                alt={category.name}
              />
              <div className="my-5 mx-5">
                <h3 className='text-green-600 my-3'>{category.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No Categories Found</div>
        )}
      </div>

      {selectedCategory && (
        <div id="subcategories-section" className='mt-8'>
          <h3 className='text-2xl dark:text-white text-center my-3'>Subcategories</h3>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {subCategories.length > 0 ? (
              subCategories.map(subCategory => (
                <div key={subCategory._id} className='group hover:shadow-green-500 shadow-lg overflow-hidden'>
                  <div className="my-5 mx-5">
                    <h3 className='text-green-600 my-3'>{subCategory.name}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No Subcategories Found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
