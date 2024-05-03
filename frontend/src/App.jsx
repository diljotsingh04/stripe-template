import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {loadStripe} from '@stripe/stripe-js';

function App() {

    const handleClick = async(price) =>{
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
        
        const body = {
            products: price
        }

        const response = await fetch(`http://localhost:3000/create-checkout-session`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
        if(result.error){
            console.log(result.error)
        }
    }
    return (
        <>
            <button onClick={() => handleClick([{name: '10 tokens', price: 10}])}>10 tokens</button>
            <button onClick={() => handleClick([{name: '20 tokens', price: 20}])}>20 tokens</button>
            <button onClick={() => handleClick([{name: '30 tokens', price: 30}])}>30 tokens</button>
            <button onClick={() => handleClick([{name: '40 tokens', price: 40}])}>50 tokens</button>
            <button onClick={() => handleClick([{name: '100 tokens', price: 100}])}>100 tokens</button>
        </>
    )
}

export default App
