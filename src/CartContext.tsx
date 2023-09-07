import { ReactNode, createContext, useState, useEffect } from "react";
import { Product, CartProduct } from "./data"

interface ContextValue {
    cart: CartProduct[];
    addToCart: (product: Product) => void;
    totalPrice: number;
    removeFromCart: (product: Product) => void;
    removeOneFromCart: (product: Product) => void;
}

export const CartContext = createContext<ContextValue>({ 
    cart: [], 
    addToCart: () => { }, 
    totalPrice: 0,
    removeFromCart: () => {},
    removeOneFromCart: () => {}
});

interface Props {
    children: ReactNode
}

export default function CartProvider({ children }: Props) {
    const [cart, setCart] = useState<CartProduct[]>(() => {
        const localStorageCart = localStorage.getItem('Grönsaks vagn');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    });
    const [totalPrice, setTotalPrice] = useState(() => {
        const localStoragePrice = localStorage.getItem('tot pris');
        return localStoragePrice ? parseFloat(localStoragePrice) : 0;
        
    });

    const addToCart = (product: Product) => {
        //setCart((prevState) => [...prevState, product]);
        const productInCart = cart.find((cartProduct => cartProduct.id === product.id))
        if (productInCart) {
            const updatedCart = cart.map((cartProduct) => {
                if(cartProduct.id === product.id) {
                    return {...cartProduct, quantity: cartProduct.quantity +1}
                } else {
                    return cartProduct;
                } 
            });
            setCart(updatedCart)
            } else {
                    const updatedCart = [...cart, {...product, quantity: 1}]
                    setCart(updatedCart)
                }
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price)
    }

    const removeFromCart = (product:Product) =>{
        const updateCart = [...cart]
        const indexToRemove = updateCart.findIndex((item) => item.id === product.id)
    
        if(indexToRemove !== -1){
            updateCart.splice(indexToRemove, 1)
            setCart(updateCart)
            setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price)
        }
    }

    const removeOneFromCart = (product:Product) =>{
        const productInCart = cart.find((cartProduct => cartProduct.id === product.id))
        if (productInCart) {
            const updatedCart = cart.map((cartProduct) => {
                if(cartProduct.id === product.id) {
                    return {...cartProduct, quantity: cartProduct.quantity -1}
                } else {
                    return cartProduct;
                } 
            });
            setCart(updatedCart)
            } else {
                    const updatedCart = [...cart, {...product, quantity: 1}]
                    setCart(updatedCart)
                }
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price)
    }

    useEffect(() => {
        localStorage.setItem('Grönsaks vagn', JSON.stringify(cart));
        localStorage.setItem('tot pris', totalPrice.toFixed(2).toString());
            //const totalPrice = cart.reduce((accumulator, product) => accumulator + product.price, 0);
            //setTotalPrice(totalPrice.toFixed(2));
            //console.log("Total Price:", totalPrice.toFixed(2));
    }, [totalPrice, cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, totalPrice, removeFromCart, removeOneFromCart}}>
            {children}
        </CartContext.Provider>
    )
}