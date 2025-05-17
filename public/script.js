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

