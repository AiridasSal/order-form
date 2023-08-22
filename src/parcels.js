document.getElementById('add-parcel').addEventListener('click', function(event) {
    event.preventDefault();
  
    const parcelContainer = document.getElementById('parcelContainer');
    const currentParcels = parcelContainer.getElementsByClassName('parcel').length;
  
    if (currentParcels < 10) {
        const parcelNumber = currentParcels + 1;
        const parcelDiv = document.createElement('div');
        parcelDiv.className = 'parcel';
  
        parcelDiv.innerHTML = `
            <label for="parcel${parcelNumber}">${parcelNumber} siuntos svoris:</label>
            <input type="text" id="parcel${parcelNumber}" name="parcel${parcelNumber}" oninput="updateEstimatedPrice()" />
            <button onclick="removeParcel(this)">Pašalinti siuntą</button>
        `;
  
        parcelContainer.appendChild(parcelDiv);
    } else {
        alert('Maksimalus siuntų kiekis yra 10.');
    }
});
function updateEstimatedPrice() {
    // Get all parcel weights
    const parcels = Array.from(document.querySelectorAll('.parcel input'))
        .map(input => parseFloat(input.value))
        .filter(weight => !isNaN(weight) && weight > 0); // Filter out invalid weights

    const route = document.getElementById('route').value;
    const payer = document.getElementById('payer').value; // Changed from querySelector to getElementById

    // Calculate the estimated price
    const { price, currency } = calculateEstimatedPrice(parcels, route, payer);

    // Display the estimated price
    document.getElementById('estimated-price').textContent = `Numatoma kaina: ${currency}${price.toFixed(2)}`;
}
// Attach event listeners to the route and payer fields
document.getElementById('route').addEventListener('change', updateEstimatedPrice);
document.getElementById('payer').addEventListener('change', updateEstimatedPrice);

// Attach event listeners to the existing parcel weight input fields
const existingParcelInputs = document.querySelectorAll('.parcel input');
existingParcelInputs.forEach(input => {
    input.addEventListener('input', updateEstimatedPrice);

});
