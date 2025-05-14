document.addEventListener('DOMContentLoaded', function() {
    // Update summary when amount changes
    const amountInput = document.getElementById('montant_sous_total_produits');
    const summaryAmount = document.getElementById('montant_total_paye');
    const totalAmount = document.getElementById('total-amount');
    
    amountInput.addEventListener('input', updateSummary);
    
    function updateSummary() {
      let amount = parseFloat(amountInput.value) || 0;
      let deliveryCost = 5.00;
      let total = amount + deliveryCost;
      
      summaryAmount.textContent = amount.toFixed(2) + ' €';
      totalAmount.textContent = total.toFixed(2) + ' €';
    }
    

  });
  paypal.Buttons({

    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value:"222"
          }
        }]
      });
    },



    // 3. Gestion des erreurs / annulations
    onCancel: function (data) {
      console.log('Achat annulé', data);
      alert('Vous avez annulé le paiement.');
    },
    onError: function (err) {
      console.error('Erreur PayPal', err);
      alert('Une erreur est survenue lors du paiement.');
    }

  }).render('#paypal-button-container');
