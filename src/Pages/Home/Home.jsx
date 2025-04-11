import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Context } from '../../Context/Context'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [clickedCategory,setClickedCategory] = useState("All");

  const { products, setProducts, categories } = useContext(Context); 

  const navigate = useNavigate();

  const fetchProducts = async () => {

      try {
        
        const res = await axios.get('https://fakestoreapi.com/products');

        if(res.status === 200){
          setProducts(res.data)
          console.log(res.data)
        }

      } 
      catch (error) {
        console.log(error.message)
      }

  }
  
  const handleProductClick = (id) => {
    
    navigate(`/detail/${id}`)

  }

  const handleCategoryBtn = async (category) => {

    const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)

    if(category !== clickedCategory){
      setClickedCategory(category)
      setProducts(res.data)
    }
    else{
      setClickedCategory("All")
      fetchProducts()
    }

  }

  useEffect(() => {
    fetchProducts()
  } , [])

  return (
    <div className='home'>
      
      <div className='categories'>
        {
          categories.map((category, index) => (
            <div onClick={() => handleCategoryBtn(category)} key={index} className='category'>
              <p className={`name ${clickedCategory===category?"clicked":""}`}>{category}</p>
            </div>
          ))
        }
      </div>

      <div className='products'>
        {
          products.map((product, index) => (
            <div onClick={() => handleProductClick(product.id,product.image,product.title,product.description,product.price)} key={index} className='product'>
              <img src={product.image} className='product-img' />
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Home