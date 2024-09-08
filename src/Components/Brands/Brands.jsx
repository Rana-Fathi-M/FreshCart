import React, { useEffect, useState } from 'react';
import './Brands.module.css';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ImSpinner } from 'react-icons/im';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    getBrands();
  }, []);

  async function getBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    setModelLoading(false);
    setSelectedBrand(null);
  }

  function openModal(brand) {
    setSelectedBrand(brand);
    setModelLoading(true);

    // Simulate loading delay (e.g., fetching more data)
    setTimeout(() => {
      setModelLoading(false);
    } , 500); // You can adjust the delay as needed
  }

  if (isLoading) return <Loading />;

  return (
    <div className="pt-24">
      <h2 className="text-green-600 text-4xl text-center my-3">Brands</h2>

      {/* Modal */}
      {selectedBrand && (
        <div className="bg-gray-600 dark:bg-slate-600 bg-opacity-50 dark:bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg h-auto p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-end">
              <IoIosCloseCircleOutline
                onClick={closeModal}
                className="text-4xl cursor-pointer text-black hover:text-gray-800 dark:text-black dark:hover:text-gray-700"
              />
            </div>
            {modelLoading ? (
              <div className="flex justify-center items-center h-full">
                <ImSpinner className="animate-spin text-gray-900 dark:text-white text-6xl" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 dark:text-black">{selectedBrand?.name}</h4>
                  <h5 className="text-md text-gray-600 dark:text-black">{selectedBrand?.slug}</h5>
                </div>
                <div>
                  <img src={selectedBrand?.image} alt={selectedBrand?.name} className="w-full h-auto rounded-md object-cover" />
                </div>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoad ? (
        <div className="flex justify-center items-center h-screen">
          <ImSpinner className="animate-spin text-gray-900 dark:text-white z-20 text-6xl" />
        </div>
      ) : (
        <div className="grid gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
          {brands.length > 0 ? (
            brands.map(brand => (
              <div key={brand._id} className="group hover:shadow-green-500 shadow-lg overflow-hidden">
                <Link to="#" onClick={() => openModal(brand)}>
                  <img
                    className="w-full h-auto max-w-full object-cover sm:h-64 md:h-48 lg:h-52 block"
                    src={brand.image}
                    alt={brand.name}
                  />
                </Link>
                <div className="my-5 mx-5">
                  <h3 className="text-green-600 my-3">{brand.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No Brands Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Brands;
