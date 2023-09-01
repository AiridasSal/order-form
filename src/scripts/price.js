let latestAdjustedPrice = 0;
let latestCurrency = '€'; 

const priceElement = document.getElementById('estimated-price')

function removeParcel(button) {
    const parcelContainer = document.getElementById('parcelContainer');
    
    // Remove the clicked button's parent div of class "parcel"
    const parcelToRemove = button.closest('.parcel');
    parcelContainer.removeChild(parcelToRemove);
  
    // Reorder the labels and input IDs after removal
    const parcels = parcelContainer.getElementsByClassName('parcel-items');
    for (let i = 1; i < parcels.length; i++) {
        const label = parcels[i].getElementsByTagName('label')[0];
        const input = parcels[i].getElementsByTagName('input')[0];
  
        label.setAttribute('for', `parcel${i + 1}`);
        label.textContent = `Papildomos siuntos Nr. ${i + 1} svoris:`;
        input.setAttribute('id', `parcel${i + 1}`);
        input.setAttribute('name', `parcel${i + 1}`);
    }
    
    updateEstimatedPrice(); // Update price after removing a parcel
}

function calculateEstimatedPrice(parcels, route, payer) {
    let basePrice = getBasePrice(parcels);
    
    // Adjust the price and currency based on route and payer
    const { adjustedPrice, currency } = adjustPriceAndCurrency(basePrice, route, payer);
    
    latestAdjustedPrice = adjustedPrice;
    latestCurrency = currency;

    return { price: adjustedPrice, currency };
}

function getBasePrice(parcels) {
    // Define your pricing rules here
    const priceUpTo5kg = 35;
    const price5to30kg = 40;

    // Calculate the price for each parcel
    const parcelPrices = parcels.map((weight) => {
        if (weight <= 5) {
            return priceUpTo5kg;
        } else if (weight > 5 && weight <= 30) {
            return price5to30kg;
        } else if (weight > 30 && weight <= 50) {
            return price5to30kg + (weight - 30) * 1.33;
        } else if (weight > 50 && weight <= 100) {
            return price5to30kg + (weight - 30) * 1.3;
        } else if (weight > 100 && weight <= 200) {
            return price5to30kg + (weight - 30) * 1.2;
        } else if (weight > 200 && weight <= 400) {
            return price5to30kg + (weight - 30) * 1;
        } else if (weight > 400 && weight <= 600) {
            return price5to30kg + (weight - 30) * 0.93;
        } else {
            return price5to30kg + (weight - 30) * 0.85;
        }
    });

    // Calculate the total price without discount
    const totalPrice = parcelPrices.reduce((sum, price) => sum + price, 0);

    // Apply a discount based on the total number of parcels
    const discount = getDiscount(parcelPrices.length);

    // Calculate the final price with discount
    const finalPrice = totalPrice * (1 - discount);
    const roundedPrice = parseFloat(finalPrice.toFixed(2));

    return roundedPrice; // This is the price before any adjustments based on route and payer
}

function adjustPriceAndCurrency(basePrice, route, payer) {
    let adjustedPrice = basePrice;
    let currency = '€'; // Default currency

    if (route === 'LT-UK') {
        if (payer === 'receiver') {
            adjustedPrice = basePrice * 0.85;
            currency = '£';
        }
    } else if (route === 'UK-LT') {
        if (payer === 'sender') {
            currency = '£';
        } else if (payer === 'receiver') {
            adjustedPrice = basePrice * 1.15;
        }
    }
    return { adjustedPrice, currency };
}

function getDiscount(numberOfParcels) {
    // Define your discount rules here
    if (numberOfParcels >= 5) {
        return 0.2; // 20% discount
    } else if (numberOfParcels >= 4) {
        return 0.15; // 15% discount
    } else if (numberOfParcels >= 3) {
        return 0.1; // 10% discount
    } else if (numberOfParcels >= 2) {
        return 0.05; // 5% discount
    } else {
        return 0; // No discount
    }
}