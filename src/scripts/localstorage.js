document.getElementById('load-saved-data').addEventListener('click', function() {
    const form = document.getElementById('parcel-form');  
    
    const savedData = JSON.parse(localStorage.getItem('EcoTrip-Order'));
    
    if (savedData) {
        const sender = savedData.sender;
        form['sender-name'].value = sender.name;
        form['sender-surname'].value = sender.surname;
        form['sender-phone'].value = sender.phone;
        form['sender-email'].value = sender.email;
        form['sender-address'].value = sender.address;
        form['hidden-sender-post-code'].value = sender.postCode;
        getPostalCodeByAddress(sender.address, 'sender-post-code');

        const receiver = savedData.receiver;
        form['receiver-name'].value = receiver.name;
        form['receiver-surname'].value = receiver.surname;
        form['receiver-phone'].value = receiver.phone;
        form['receiver-email'].value = receiver.email;
        form['receiver-address'].value = receiver.address;
        form['hidden-receiver-post-code'].value = receiver.postCode;
        getPostalCodeByAddress(receiver.address, 'receiver-post-code');

        form['order-email'].value = savedData.orderEmail;
        form.payer.value = savedData.payer;
        form.comment.value = savedData.description;
        form['payment-type'].value = savedData.paymentType;
        form['invoice-checkbox'].checked = savedData.invoice ? true : false;

        if (savedData.invoice) {
            const invoice = savedData.invoice;
            form['company-name'].value = invoice.companyName;
            form['company-code'].value = invoice.companyCode;
            form['company-address'].value = invoice.companyAddress;
            form['company-email'].value = invoice.companyEmail;
            getPostalCodeByAddress(invoice.companyAddress, 'company-post-code');
        }

    } else {
        alert('Neturite išsaugotų užsakymų');
    }
});

