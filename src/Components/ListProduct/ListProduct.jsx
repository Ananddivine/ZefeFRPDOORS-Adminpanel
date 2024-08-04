import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproduct, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched products:', data); // Check data structure
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product removed:', data); // Check response data

      if (data.success) {
        await fetchInfo(); // Refresh the product list
      } else {
        console.error('Failed to remove product:', data.message);
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className='ListProduct'>
      <h1>ALL PRODUCTS LIST</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproduct.map((product, index) => {
          console.log('Rendering product:', product); // Check product details
          return (
            <div key={product._id || index} className="listproduct-format-main listproduct-format">
              <img 
                src={product.image || 'https://via.placeholder.com/150'} 
                alt={product.name} 
                className="listproduct-product-icon" 
              />
              <p>{product.name}</p>
              <p>&{product.old_price}</p>
              <p>&{product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => remove_product(product.id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
