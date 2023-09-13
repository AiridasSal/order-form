
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('parcel-form');
  const submitButton = form.querySelector('[type="submit"]');
  const loader = document.getElementById('loader');
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    submitButton.disabled = true;
    loader.classList.remove('hidden');
    if (validateForm()) {
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

      try {
        const response = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(structuredData)
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
        } else {
          console.error('Failed to post data:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        // Re-enable the submit button and hide loader
        submitButton.disabled = false;
        loader.classList.add('hidden');
      }
    } else {
      // Re-enable the submit button and hide loader if validation fails
      submitButton.disabled = false;
      loader.classList.add('hidden');
    }
  });
});





