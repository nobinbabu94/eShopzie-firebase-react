require("dotenv").config()
const express = require("express");
const cors = require("cors")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
  

const app = express();
app.use(cors())
app.use(express.json());
// const path = require("path");


app.get("/", (req, res) => {
    res.send("Welcome to eShopzy")
});

const array = [];

const calculateOrderAmount = (items) => {

    items.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
    });
   
    //array reduce method have 2 parameters and will return all the values to be calculated, initial value 0

    const totalAmount = array.reduce((a, b) => {
        return a + b;
    }, 0);

    return totalAmount;
};

app.post("create-payment-intent/", async (req, res) => {
    const { items,billing, description, } = req.body;

    // Create a PaymentIntent with the order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
        
        amount: calculateOrderAmount(items),
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
        description,
        shipping: {
            address: {
              line1: billing.address1,
              line2: billing.address2,
              city: billing.city,
              country: billing.country,
              postal_code: billing.pin,
              state: billing.state 
              
            },
        
            name: billing.recepient,
            phone: billing.phone,
        },
        // receipt_email:userEmail 

    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });

});
const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
