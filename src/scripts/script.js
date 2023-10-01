
// Add these functions to your script
function checkPreviousData() {
  const savedData = JSON.parse(localStorage.getItem('EcoTrip-Order'));
  if (savedData) {
      // Show modal if there's saved data
      document.getElementById('previous-data-modal').style.display = 'block';
  }
}

function usePreviousData() {
  // This function should load the previous data into the form
  document.getElementById('load-saved-data').click();  // Assuming you have this button in your HTML
  closeModal();
}

function closeModal() {
  document.getElementById('previous-data-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('parcel-form');
  const submitButton = form.querySelector('[type="submit"]');
  const loader = document.getElementById('loader');
  const orderConfirmed = document.getElementById('order-confirmed');
  

  
  orderConfirmed.classList.add('message-container');
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    submitButton.disabled = true;
    loader.classList.remove('hidden');
    if (validateForm()) {
        // Extract form data and structure it
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const structuredData = {
          route: data.route,
          year: Number(data.year),
          month: Number(data.month),
          day: data.day,
          parcels: Object.keys(data).filter(key => key.startsWith('parcel')).map(key => ({ weight: Number(data[key]) })),
          sender: {
            name: data['sender-name'],
            surname: data['sender-surname'],
            phone: data['sender-phone'],
            email: data['sender-email'],
            address: data['sender-address'],
            postCode: data['hidden-sender-post-code']
          },
          receiver: {
            name: data['receiver-name'],
            surname: data['receiver-surname'],
            phone: data['receiver-phone'],
            email: data['receiver-email'],
            address: data['receiver-address'],
            postCode: data['hidden-receiver-post-code']
          },
          estimatedPrice: {
            value: latestAdjustedPrice,
            currency: latestCurrency
          },
          // Additional fields
          orderEmail: data['order-email'],
          payer: data.payer,
          description: data.comment,
          paymentType: data['payment-type'],
          invoice: data['invoice-checkbox'] === 'on' ? {
            companyName: data['company-name'],
            companyCode: data['company-code'],
            companyAddress: data['company-address'],
            companyEmail: data['company-email']
          } : null
        };
        localStorage.setItem('EcoTrip-Order', JSON.stringify(structuredData));

        form.style.display = 'none';
        loader.classList.remove('hidden');
        
      setTimeout(async () => {


          try {
            const response = await fetch('https://discounts-qpv5g.ondigitalocean.app/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(structuredData)
            });
            const responseData = await response.json();
            const orderId = responseData.orderId;
            if (response.ok) {
              // Display a message in Lithuanian
              orderConfirmed.innerHTML = `
              <h2>Užsakymas sėkmingai Užregistruotas</h2>
              <p>Jūsų užsakymo ID yra <strong>${orderId}</strong>.</p>
              <p>Nurodytu el. paštu netrukus gausite užsakymo patvirtinimą ir papildomą informaciją.</p>
              <p>Jeigu negausite laiško, prašome susisiekti su 'EcoTrip' telefonu <a href="tel:+37060122060">+37060122060</a> arba <a href="tel:+447479622299">+447479622299</a>.</p>
              <div class="save-info-container">
              <input type="checkbox" id="save-info" name="save-info" value="save-info" checked>
              <label for="save-info">Išsaugokite informaciją kitam kartui</label></div>          `;
                        form.reset();
      // Attach event listener to 'save-info' checkbox
      document.getElementById('save-info').addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('EcoTrip-Order', JSON.stringify(structuredData));
        } else {
            localStorage.removeItem('EcoTrip-Order');
        }
    });

} else {
    form.style.display = 'block';
    console.error('Failed to post data:', response.statusText);
}

} catch (error) {
form.style.display = 'block';
console.error('Network error:', error);
} finally {
submitButton.disabled = false;

loader.classList.add('hidden');
}
}, 2000);  // 2000 milliseconds = 2 seconds

} else {
submitButton.disabled = false;
loader.classList.add('hidden');
}
});
});