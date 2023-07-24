import { createContext, useContext, useEffect, useState} from 'react'
const CartContext=createContext()
const CartProvider=({children})=>{
    const [cart, setCart] = useState([])
    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCart(storedCartItems);
    }, []);
  
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, count) => {
      const existingItemIndex = cart.findIndex(item => item._id === product._id && item.size === size);
      
          if (existingItemIndex !== -1) {
            setCart(prevCartItems => {
              const updatedCartItems = [...prevCartItems];
              updatedCartItems[existingItemIndex].count += count;
              return updatedCartItems;
            });
          } else {
            setCart(prevCartItems => [...prevCartItems, { 
              _id:product._id,
              name:product.name,
              slug:product.slug,
              price:product.price,
              size: size,
              count: count }]);
          }
    };
    return(
        <CartContext.Provider value={{cart,addToCart,setCart}}>
            {children}
        </CartContext.Provider>
    )
}

 const useCart=()=>useContext(CartContext)

export {useCart,CartProvider}