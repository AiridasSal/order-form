// Attach an event listener to the 'load-saved-data' button
document.getElementById('load-saved-data').addEventListener('click', function() {
    // Get a reference to the form element
    const form = document.getElementById('parcel-form');  
    
    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('EcoTrip-Order'));
    
    // Check if there is saved data
    if (savedData) {
        // Populate Sender Information
        const sender = savedData.sender;
        form['sender-name'].value = sender.name;
        form['sender-surname'].value = sender.surname;
        form['sender-phone'].value = sender.phone;
        form['sender-email'].value = sender.email;
        form['sender-address'].value = sender.address;
        form['hidden-sender-post-code'].value = sender.postCode;
        getPostalCodeByAddress(sender.address, 'sender-post-code');

        // Populate Receiver Information
        const receiver = savedData.receiver;
        form['receiver-name'].value = receiver.name;
        form['receiver-surname'].value = receiver.surname;
        form['receiver-phone'].value = receiver.phone;
        form['receiver-email'].value = receiver.email;
        form['receiver-address'].value = receiver.address;
        form['hidden-receiver-post-code'].value = receiver.postCode;
        getPostalCodeByAddress(receiver.address, 'receiver-post-code');

        // Populate Additional Fields
        form['order-email'].value = savedData.orderEmail;
        form.payer.value = savedData.payer;
        form.comment.value = savedData.description;
        form['payment-type'].value = savedData.paymentType;
        form['invoice-checkbox'].checked = savedData.invoice ? true : false;

        // Check if invoice data is present and populate invoice fields
        if (savedData.invoice) {
            const invoice = savedData.invoice;
            form['company-name'].value = invoice.companyName;
            form['company-code'].value = invoice.companyCode;
            form['company-address'].value = invoice.companyAddress;
            form['company-email'].value = invoice.companyEmail;
            getPostalCodeByAddress(invoice.companyAddress, 'company-post-code');
        }

    } else {
        // Alert the user if no saved data is found
        alert('Neturite išsaugotų užsakymų');
    }
});

