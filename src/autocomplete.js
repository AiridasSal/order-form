// Google Maps Address Autocomplete
function initAutocomplete() {
    const options = {};  // No types parameter set

    const senderAddressAutocomplete = new google.maps.places.Autocomplete(document.getElementById('sender-address'), options);
    senderAddressAutocomplete.addListener('place_changed', function() {
        fillInAddress(senderAddressAutocomplete, 'sender');
    });

    const receiverAddressAutocomplete = new google.maps.places.Autocomplete(document.getElementById('receiver-address'), options);
    receiverAddressAutocomplete.addListener('place_changed', function() {
        fillInAddress(receiverAddressAutocomplete, 'receiver');
    });
    const companyAddressAutocomplete = new google.maps.places.Autocomplete(document.getElementById('company-address'), options);
    receiverAddressAutocomplete.addListener('place_changed', function() {
        fillInAddress(receiverAddressAutocomplete, 'company');
    });
}

function fillInAddress(autocomplete, type) {
    const place = autocomplete.getPlace();
    let postalCode = '';
    for (let i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (addressType === 'postal_code') {
            postalCode = place.address_components[i].long_name;
        }
    }
    document.getElementById(`${type}-post-code`).value = postalCode;
    document.getElementById(`hidden-${type}-post-code`).value = postalCode;
}
