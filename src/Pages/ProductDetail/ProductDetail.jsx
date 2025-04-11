import React, { useContext } from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom'
import { Context } from '../../Context/Context';

function ProductDetail() {

    const {products,addToCart} = useContext(Context);

    const {id} = useParams();

    const product = products.filter((prod) => prod.id == id)

    // useEffect(()=>{
    //     console.log(typeof id)
    //     console.log(product)
    //     console.log("cat:",categories)
    // },[])

  return (
    <div className='container'>

        <div className='productdetail'>

        <img src={product[0].image} className='img' />
            
        <div className='detail-list'>

            <h3 className='detail list-title'>{product[0].title}</h3>

            <p className='detail list-desc'>{product[0].description}</p>

            <p className='detail list-price'>${product[0].price}</p>

        </div>

        </div>

        <button onClick={() => addToCart(id)} className='add-btn'>Add</button>

    </div>
  )
}

export default ProductDetail