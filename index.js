// const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
// const { request, response } = require('express');
const stripe = require('stripe')('sk_test_51Gv48QE8jGXUW6OU3tRBgJkZo22BEN8qD5tk9mqsbIcjcQH1hy0soHRswMqLcVTSR52VI9iO1H71XbOGTgrawYLw009BQPsy7L');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (request, response) => {
    response.send("hello")
})
app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log("payment request recieved amount:", total);
    var customer = await stripe.customers.create({
        name: 'Jenny Rosen',
        address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
        }
    });
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        description: 'Software development services',
        customer: customer.id
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
});
app.listen(3001 || process.env.PORT, (req, res) => {
    console.log("server is running");
})

// exports.api = functions.https.onRequest(app)