function createValidator(condition, errorMessage) {
  return function (inputId, errorId) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);
    
    if (!condition(inputElement.value)) {
      errorElement.textContent = errorMessage;
      inputElement.classList.add("error");
      return false;
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove("error");
      return true;
    }
  };
}

// Define validators
const validateLength = createValidator(value => value.length >= 3, "Vardas ir pavardė privalo turėti ne mažiau kaip 3 simbolius.");
const validatePhone = createValidator(value => /^\+\d+/.test(value), 'Neteisingas telefono formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44.');
const validateEmail = createValidator(value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value), "Neteisingas el. pašto formatas, pvz., info@ecotrip.lt.");
const validateAddress = createValidator(value => /([A-Za-z\s]+) \s*([\d\/A-Za-z\s]+) \s*([\d\/A-Za-z\s]+)/.test(value), "Neteisingas adreso formatas. Adresas turi turėti miestą, gatvę ir pastato numerį.");
const validateSelection = createValidator(value => value !== "route-not-selected" && value !== "", "Laukeliai yra privalomi, pašome pasirinkti.");
function createValidator(condition, errorMessage) {
  return function (inputId, errorId) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);
    
    // Check if the element is a checkbox, if so, use the checked property, else use the value property
    const valueToCheck = inputElement.type === 'checkbox' ? inputElement.checked : inputElement.value;
    
    if (!condition(valueToCheck)) {
      errorElement.textContent = errorMessage;
      inputElement.classList.add("error");
      return false;
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove("error");
      return true;
    }
  };
}

const validateCheckbox = createValidator(value => value, "Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.");

const validateWeight = createValidator(value => {
  const weightValue = parseFloat(value);
  return weightValue >= 0.1 && weightValue === Math.abs(weightValue);
}, "Neteisingas svoris. Minimalus svoris yra 0.1.");

function validateForm() {
  let isValid = true;

  // Validate fields
  isValid &= validateLength("sender-name", "sender-name-error");
  isValid &= validateLength("sender-surname", "sender-surname-error");
  isValid &= validatePhone("sender-phone", "sender-phone-error");
  isValid &= validateEmail("sender-email", "sender-email-error");
  isValid &= validateAddress("sender-address", "sender-address-error");
  
  isValid &= validateLength("receiver-name", "receiver-name-error");
  isValid &= validateLength("receiver-surname", "receiver-surname-error");
  isValid &= validatePhone("receiver-phone", "receiver-phone-error");
  isValid &= validateEmail("receiver-email", "receiver-email-error");
  isValid &= validateAddress("receiver-address", "receiver-address-error");
  
  // Route Validation
  isValid &= validateSelection("route", "route-error");

  // Date Validation
  isValid &= validateSelection("day", "date-error");

  // Order Email Validation
  isValid &= validateEmail("order-email", "order-email-error");

  // Payer Validation
  isValid &= validateSelection("payer", "payer-error");

  // Payment Type Validation
  isValid &= validateSelection("payment-type", "payment-type-error");

  // Invoice Fields Validation
  const invoiceCheckbox = document.getElementById("invoice-checkbox");
  if (invoiceCheckbox.checked) {
    isValid &= validateLength("company-name", "company-name-error");
    isValid &= validateAddress("company-address", "company-address-error");
    isValid &= validateEmail("company-email", "company-email-error");
  }

  // Parcels Weight Validation
  const parcels = document.querySelectorAll(".parcel input");
  parcels.forEach(parcel => {
    isValid &= validateWeight(parcel.id, "parcel-error");
  });

  // Packing Rules Checkbox Validation
  isValid &= validateCheckbox("packing-rules", "packing-rules-error");

  // Shipping Rules Checkbox Validation
  isValid &= validateCheckbox("shipping-rules", "shipping-rules-error");

  return isValid;
}
function attachInputListener(inputId, validator, errorId) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);

  inputElement.addEventListener('input', function() {
    validator(inputId, errorId);
  });
}

// Attach event listeners to input fields
attachInputListener("sender-name", validateLength, "sender-name-error");
attachInputListener("sender-surname", validateLength, "sender-surname-error");
attachInputListener("sender-phone", validatePhone, "sender-phone-error");
attachInputListener("sender-email", validateEmail, "sender-email-error");
// attachInputListener("sender-address", validateAddress, "sender-address-error");

attachInputListener("receiver-name", validateLength, "receiver-name-error");
attachInputListener("receiver-surname", validateLength, "receiver-surname-error");
attachInputListener("receiver-phone", validatePhone, "receiver-phone-error");
attachInputListener("receiver-email", validateEmail, "receiver-email-error");
// attachInputListener("receiver-address", validateAddress, "receiver-address-error");

attachInputListener("route", validateSelection, "route-error");
attachInputListener("day", validateSelection, "date-error");
attachInputListener("order-email", validateEmail, "order-email-error");
attachInputListener("payer", validateSelection, "payer-error");
attachInputListener("payment-type", validateSelection, "payment-type-error");

const invoiceCheckbox = document.getElementById("invoice-checkbox");
if (invoiceCheckbox.checked) {
  attachInputListener("company-name", validateLength, "company-name-error");
  attachInputListener("company-address", validateAddress, "company-address-error");
  attachInputListener("company-email", validateEmail, "company-email-error");
}

const parcels = document.querySelectorAll(".parcel input");
parcels.forEach(parcel => {
  attachInputListener(parcel.id, validateWeight, "parcel-error");
});

attachInputListener("packing-rules", validateCheckbox, "packing-rules-error");
attachInputListener("shipping-rules", validateCheckbox, "shipping-rules-error");
