import { useContext } from 'react'
import { CartContext } from './CartContext'
import { RiDeleteBinFill } from "react-icons/ri";
import { Product } from './data';

export default function ViewCart() {

    const { cart, totalPrice, removeFromCart, removeOneFromCart, addToCart  } = useContext(CartContext)
    const handleRemoveClick = (product: Product) => {
        removeFromCart(product)
    }
  return (
    <>
        <h2>Kundvagn: </h2>
            <div className='cart-item'>
            <ul>
                {cart.map((product, index) => (
                    <li key={index}>
                      <button onClick={() => removeOneFromCart(product)}> - </button>
                      <input value={product.quantity} /> 
                      <button onClick={() => addToCart(product)}> + </button> 
                      {product.name} á: 
                      {product.price.toFixed(2)} kr
                        <button onClick={() => handleRemoveClick(product)}> <RiDeleteBinFill /> </button>
                    </li>
                ))}
            </ul>
            </div>
        <h3>Totalt: {totalPrice.toFixed(2)}</h3>
    </>
  )
}
