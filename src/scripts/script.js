document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('parcel-form');
  const submitButton = form.querySelector('[type="submit"]');
  const loader = document.getElementById('loader');
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    submitButton.disabled = true;
    
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

            if (response.ok) {
              // Display a message in Lithuanian
              messageContainer.innerText = "Užsakymas sėkmingai užregistruotas. Nurodytu el. paštu netrukus gausite užsakymo patvirtinimą ir papildomą informaciją. Jeigu negausite laiško, prašome susisiekti su 'EcoTrip' telefonu +37060122060 arba +447479622299";
              document.body.appendChild(messageContainer);
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
        }, 2000); // 2000 milliseconds = 2 seconds
    } else {
      submitButton.disabled = false;
      loader.classList.add('hidden');
    }
  });
});
// Inside the iframe content
document.addEventListener('input', function() {
  window.parent.postMessage('resizeIframe', '*');
});
document.addEventListener('click', function() {
  window.parent.postMessage('resizeIframe', '*');
});
