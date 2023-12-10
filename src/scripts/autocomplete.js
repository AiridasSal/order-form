function initAutocomplete() {
    const options = {};  
  
    const senderAddressAutocomplete = new google.maps.places.Autocomplete(document.getElementById('sender-address'), options);
    senderAddressAutocomplete.addListener('place_changed', function() {
      fillInAddress(senderAddressAutocomplete, 'sender');
    });
  
    const receiverAddressAutocomplete = new google.maps.places.Autocomplete(document.getElementById('receiver-address'), options);
    receiverAddressAutocomplete.addListener('place_changed', function() {
      fillInAddress(receiverAddressAutocomplete, 'receiver');
    });
  
    const companyAddressAutocomplete = new google.maps.places.Autocomplete(document.getElementById('company-address'), options);
    companyAddressAutocomplete.addListener('place_changed', function() {
      fillInAddress(companyAddressAutocomplete, 'company');
    });
    
    ['sender', 'receiver', 'company'].forEach((type) => {
      document.getElementById(`${type}-address`).addEventListener('focusout', function() {
        getPostalCodeByAddress(this.value, `${type}-post-code`);
      });
    });
  }
  
  function fillInAddress(autocomplete, type) {
    const place = autocomplete.getPlace();
    let postalCode = '';
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (addressType === 'postal_code') {
        postalCode = place.address_components[i].long_name;
        break;
      }
    }
    document.getElementById(`${type}-post-code`).value = postalCode;
    document.getElementById(`hidden-${type}-post-code`).value = postalCode;
  }
  
  async function getPostalCodeByAddress(address, elementId) {
    const geocoder = new google.maps.Geocoder();
    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address }, function (results, status) {
          if (status === 'OK') {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });
  
      let postalCode = '';
      for (const component of results[0].address_components) {
        if (component.types.includes('postal_code')) {
          postalCode = component.long_name;
          break;
        }
      }
      document.getElementById(elementId).value = postalCode;
    } catch (error) {
      console.error('Geocoding failed:', error);
    }
  }
  