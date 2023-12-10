document.getElementById('payment-type').addEventListener('change', function() {
  const paymentType = this.value;
  const checkbox = document.getElementById('invoice-checkbox');

  if (paymentType === 'pavedimu') {
      checkbox.checked = true; 
  } else {
      checkbox.checked = false; 
  }

  toggleInvoiceFields();
});

function toggleInvoiceFields() {
  const invoiceFields = document.getElementById('invoice-fields');
  const checkbox = document.getElementById('invoice-checkbox');
  const inputs = invoiceFields.querySelectorAll('input'); 

  if (checkbox.checked) {
      invoiceFields.style.display = 'flex';
      inputs.forEach(input => input.setAttribute('required', true)); 
  } else {
      invoiceFields.style.display = 'none';
      inputs.forEach(input => input.removeAttribute('required')); 
  }
}
document.getElementById('parcel-form').addEventListener('submit', function(event) {
  const paymentType = document.getElementById('payment-type').value;
  const checkbox = document.getElementById('invoice-checkbox');
  const submitError = document.getElementById('submit-error')
  if (paymentType === 'pavedimu' && !checkbox.checked) {
      event.preventDefault(); 
      checkbox.checked = true; 
      toggleInvoiceFields(); 
      submitError.textContent = 'Prašome užpildyti įmonės duomenis'  }
      else {
        submitError.textContent = ""
      }
});
