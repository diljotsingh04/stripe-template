const express = require("express");
const cors = require('cors');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json())

app.post('/create-checkout-session', async(req, res) => {
    const {products} = req.body;

    const lineItems = products.map(product => ({
        price_data : {
            currency: "inr",
            product_data: {
                name: product.name,
                images: ["https://clipart-library.com/images/rijGxariR.jpg"]
            },
            unit_amount: Math.round(product.price * 100)
        },
        quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://www.google.com/",
        cancel_url: "https://www.facebook.com/"
    })

    return res.send({id: session.id})
})

app.listen(3000);