import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "shop",
        new_price: "",
        old_price: "",
        description: "" // Added description field
    });

    const imageHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setProductDetails({ ...productDetails, image: file.name }); // For displaying purposes only
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
      
        let formData = new FormData();
        formData.append('product', image);
        formData.append('name', productDetails.name);
        formData.append('category', productDetails.category);
        formData.append('new_price', productDetails.new_price);
        formData.append('old_price', productDetails.old_price);
        formData.append('description', productDetails.description); // Include description
      
        try {
          const response = await fetch('https://zefefrpdoors-backend.onrender.com/upload', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          responseData = await response.json();
      
          if (responseData.success) {
            console.log(responseData);
      
            // Update product details with the full image URL
            const updatedProductDetails = {
              ...productDetails,
              image: responseData.Image_url,
            };
      
            // Submit product details to the server
            const productResponse = await fetch('https://zefefrpdoors-backend.onrender.com/addproduct', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedProductDetails),
            });
      
            const productData = await productResponse.json();
      
            if (productData.success) {
              alert("Product Added");
            } else {
              alert("Failed to Add Product");
            }
          } else {
            console.error('Failed to upload image:', responseData.message);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };

    return (
        <div className='AddProduct'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here ' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here ' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='addproduct-selector'>
                    <option value='shop'>Shop</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Description</p>
                <textarea value={productDetails.description} onChange={changeHandler} name='description' placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnile-img' alt="" />
                </label>
                <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
            </div>
            <div className='addproduct-btn-container'>
                <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    );
};

export default AddProduct;
