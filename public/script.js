
document.addEventListener('DOMContentLoaded', function () {
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

  // Initialiser au chargement
  updateSummary();

  // Configurer PayPal
  paypal.Buttons({
    createOrder: function (data, actions) {
      if (!validateForm()) {
        alert('Veuillez remplir tous les champs requis.');
        return actions.reject();
      }

      // Récupérer dynamiquement la valeur dans #total-amount
      let amountText = document.getElementById("total-amount").textContent;
      let numericValue = parseFloat(amountText.replace(',', '.').replace(/[^\d.]/g, ''));

      return actions.order.create({
        purchase_units: [{
          amount: {
            value: numericValue.toFixed(2) // Toujours formaté comme "5.00"
          }
        }]
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert('Transaction réussie !\n' + details.payer.name.given_name + ': ' + details.id);
      });
    },

    onError: function (err) {
      console.error('Erreur lors du paiement', err);
      alert('Une erreur est survenue lors du traitement du paiement.');
    }
  }).render('#paypal-button-container');
});
