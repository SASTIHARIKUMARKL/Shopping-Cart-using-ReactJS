import React, { useReducer } from "react";
import './content.css';
import image1 from './image/img1.jpg';
import image2 from './image/img2.jpg';
import image3 from './image/img3.jpg';
import image4 from './image/img4.jpg';
import image5 from './image/img5.jpg';

const reduce = (state, action) => {
    switch (action.type) {
        case 'ADD_CART':
            return state.map((item) =>
                item.id === action.id
                    ? { ...item, quantity: 1 }
                    : item
            );
        case 'INCRS_QNTY':
            return state.map((item) =>
                item.id === action.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        case 'DCRS_QNTY':
            return state.map((item) =>
                item.id === action.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        default:
            return state;
    }
};

const initialState = [
    { id: 1, name: 'Orange', image: image1, quantity: 0 },
    { id: 2, name: 'Strawberry', image: image2, quantity: 0 },
    { id: 3, name: 'Grapes', image: image3, quantity: 0 },
    { id: 4, name: 'Apple', image: image4, quantity: 0 },
    { id: 5, name: 'Citrus', image: image5, quantity: 0 },
];

const Cart = () => {
    const [cart, dispatch] = useReducer(reduce, initialState);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    return (
      <main className="main-container">
        <div className="list">
            {cart.map((item) => (
                <div key={item.id} className="product">
                    <img src={item.image} alt={item.name} className="product-image" />
                    <h4 className="product-name">{item.name}</h4>
                    {item.quantity === 0 ? (
                        <button onClick={() => dispatch({ type: 'ADD_CART', id: item.id })} className="add-btn">Add</button>
                    ) : (
                        <div className="qnty-cnt">
                            <button onClick={() => dispatch({ type: 'DCRS_QNTY', id: item.id })} className="qnty-btn">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => dispatch({ type: 'INCRS_QNTY', id: item.id })} className="qnty-btn">+</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div className="ttl-qnty">
                <h3>Total Quantity: {totalQuantity}</h3>
            </div>
        </main>
    );
};

export default Cart;
