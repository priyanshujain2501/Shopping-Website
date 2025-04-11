import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs";
import { Context } from '../../Context/Context';

function Navbar() {

  const {cartItems,token,login,logout} = useContext(Context);

  const navigate = useNavigate();

  const countCartItem = () => {

    let count = 0;

    for(let item in cartItems){
      count++;
    }

    return count;

  }

  const handleLogoutBtn = () => {

    logout();
    navigate("/login");

  }

  const handleLoginBtn = () => {
    navigate("/login")
  }


  return (
    <div className='navbar'>
        
        <div className='navbar-sub'>

          <h1 className='navbar-heading'>Shopping Website</h1>

          <div className='navbar-list'>

            <Link to="/" className='list list-home'>
              Home
            </Link>

          </div>

          <div className='navbar-end'>

            <Link to="/cart" className='list list-cart'>
              <BsCart3/>
            {countCartItem() > 0 && <div className='item-count'>{countCartItem()}</div>}
            </Link>

            {token && <button onClick={handleLogoutBtn} className='logout-btn'>Logout</button>}

            {!token && <button onClick={handleLoginBtn} className='logout-btn'>Login</button>}


          </div>

        </div>
        
    </div>
  )
}

export default Navbar