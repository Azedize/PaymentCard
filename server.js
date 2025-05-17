const path = require('path');
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const stripe = Stripe('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');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());

// Middleware pour gérer les sessions Stripe
app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.json({
      status: session.status,
      amount_total: session.amount_total / 100,
      customer_email: session.customer_details.email
    });
  } catch (error) {
    res.status(400).json({ error: 'Session invalide' });
  }
});

// Création de la session de paiement
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Produit' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: '/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: '/cancel.html'
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erreur création session Stripe:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes de fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cancel.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
