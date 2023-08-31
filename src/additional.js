document.getElementById('payment-type').addEventListener('change', function() {
  const paymentType = this.value;
  const checkbox = document.getElementById('invoice-checkbox');

  if (paymentType === 'transfer') {
      checkbox.checked = true; // Check the checkbox
  } else {
      checkbox.checked = false; // Uncheck the checkbox
  }

  toggleInvoiceFields(); // Update the display of the invoice fields based on the checkbox state
});

function toggleInvoiceFields() {
  const invoiceFields = document.getElementById('invoice-fields');
  const checkbox = document.getElementById('invoice-checkbox');
  const inputs = invoiceFields.querySelectorAll('input'); // Get all input fields within the invoiceFields container

  if (checkbox.checked) {
      invoiceFields.style.display = 'flex';
      inputs.forEach(input => input.setAttribute('required', true)); // Set each input field as required
  } else {
      invoiceFields.style.display = 'none';
      inputs.forEach(input => input.removeAttribute('required')); // Remove the required attribute from each input field
  }
}
document.getElementById('parcel-form').addEventListener('submit', function(event) {
  const paymentType = document.getElementById('payment-type').value;
  const checkbox = document.getElementById('invoice-checkbox');
  const submitError = document.getElementById('submit-error')
  if (paymentType === 'pavedimas' && !checkbox.checked) {
      event.preventDefault(); // Prevent the form from submitting
      checkbox.checked = true; // Check the checkbox
      toggleInvoiceFields(); // Display the invoice fields
      submitError.textContent = 'Prašome užpildyti įmonės duomenis'  }
      else {
        submitError.textContent = ""
      }
});
