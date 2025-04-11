import React, { useContext, useState } from 'react'
import './Cart.css'
import { Context } from '../../Context/Context'
import { RxCrossCircled } from "react-icons/rx";

function Cart() {

  const { cartItems, setCartItems, removeFromCart, products, getCartTotalAmt } = useContext(Context);

  const [popup,setPopup] = useState(false);

  const handleCheckoutBtn = () => {

    if(getCartTotalAmt() > 0){

        setPopup(true);

        setCartItems({});
        setTimeout(() => setPopup(false),4000)

    }

  }

  return (
    <div className='cart'>

      <div className='cart-container'>

        <div className='cart-heading'>
          <p>Image</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Remove</p>
        </div>

        <div className='cart-product'>
          {
            products.map((item, index) => {
              if (cartItems[item.id] > 0) {
                return <div key={index} className='cart-product-item'>

                  <img src={item.image} className='cart-img' />

                  <p className='cart-quantity'>{cartItems[item.id]}</p>

                  <p className='cart-price'>${item.price}</p>

                  <RxCrossCircled className='cross-icon' onClick={() => removeFromCart(item.id)} />

                </div>
              }
            })
          }
        </div>

        <div className='cart-checkout'>

          {getCartTotalAmt() > 0 && <div className='cart-total'>
            <b>Total</b>
            <p>{getCartTotalAmt()}</p>
          </div>}

          {getCartTotalAmt() > 0 && <button onClick={handleCheckoutBtn} className='cart-checkout-btn'>Checkout</button>}

          {popup && (
            <div className="popup">
                Order placed successfully!
            </div>
          )}

          {getCartTotalAmt()===0 && !popup && <div className='cart-empty'>
            Cart is empty
          </div> }

        </div>

      </div>

    </div>
  )
}

export default Cart