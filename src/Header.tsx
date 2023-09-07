import { useContext, useState } from 'react'
import { CartContext } from './CartContext'
import ViewCart from './ViewCart'
import { NavLink } from 'react-router-dom';
export default function Header() {

    const { cart,  totalPrice } = useContext(CartContext)
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        //console.log("Kundvagn: " + cart.length + "  varor. Tot:" + totalPrice.toFixed(2) + " kr");
    };

  return (
        <div 
        className='header-div'
        style={{
            "width": "60rem",
            "minHeight": "10rem",
            "backgroundColor": "hotpink",
            }}   
        >
            <h1>Butik</h1>
            <button
            onClick={toggleCart}
            >Kundvagn: { cart.length } varor. Tot:{ totalPrice.toFixed(2) } kr
            </button>
            {isCartOpen && <ViewCart />}
            <nav>
                <NavLink to={"/About"} className={({ isActive }) => (isActive ? 'active' : '')} >Om oss</NavLink><br />
                <NavLink to={"/"} className={({ isActive }) => (isActive ? 'active' : '')} >hem</NavLink>
            </nav>
        </div>


  )
}
