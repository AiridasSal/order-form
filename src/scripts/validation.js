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
const validateAddress = createValidator(value => value.trim().length > 0, "Adresas negali būti tuščias.");
const validatePhone = createValidator(value => /^\+\d+/.test(value), 'Neteisingas telefono formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44.');
const validateEmail = createValidator(value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value), "Neteisingas el. pašto formatas, pvz., info@ecotrip.lt.");
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
  let firstInvalidField = null;

  const checkAndStoreFirstInvalidField = (validationResult, inputId) => {
    if (!validationResult && !firstInvalidField) {
      firstInvalidField = document.getElementById(inputId);
    }
  };

  // Validate fields
  let validationResult;

  

  validationResult = validateSelection("route", "route-error");
  checkAndStoreFirstInvalidField(validationResult, "route");
  isValid &= validationResult;

  validationResult = validateSelection("day", "date-error");
  checkAndStoreFirstInvalidField(validationResult, "day");
  isValid &= validationResult;

  validationResult = validateEmail("order-email", "order-email-error");
  checkAndStoreFirstInvalidField(validationResult, "order-email");
  isValid &= validationResult;

  validationResult = validateSelection("payer", "payer-error");
  checkAndStoreFirstInvalidField(validationResult, "payer");
  isValid &= validationResult;

  validationResult = validateSelection("payment-type", "payment-type-error");
  checkAndStoreFirstInvalidField(validationResult, "payment-type");
  isValid &= validationResult;

  const invoiceCheckbox = document.getElementById("invoice-checkbox");
  if (invoiceCheckbox.checked) {
    validationResult = validateLength("company-name", "company-name-error");
    checkAndStoreFirstInvalidField(validationResult, "company-name");
    isValid &= validationResult;

    validationResult = validateAddress("company-address", "company-address-error");
    checkAndStoreFirstInvalidField(validationResult, "company-address");
    isValid &= validationResult;

    validationResult = validateEmail("company-email", "company-email-error");
    checkAndStoreFirstInvalidField(validationResult, "company-email");
    isValid &= validationResult;
  }
  validationResult = validateLength("sender-name", "sender-name-error");
  checkAndStoreFirstInvalidField(validationResult, "sender-name");
  isValid &= validationResult;

  validationResult = validateLength("sender-surname", "sender-surname-error");
  checkAndStoreFirstInvalidField(validationResult, "sender-surname");
  isValid &= validationResult;

  validationResult = validatePhone("sender-phone", "sender-phone-error");
  checkAndStoreFirstInvalidField(validationResult, "sender-phone");
  isValid &= validationResult;

  validationResult = validateEmail("sender-email", "sender-email-error");
  checkAndStoreFirstInvalidField(validationResult, "sender-email");
  isValid &= validationResult;

  validationResult = validateAddress("sender-address", "sender-address-error");
  checkAndStoreFirstInvalidField(validationResult, "sender-address");
  isValid &= validationResult;

  validationResult = validateLength("receiver-name", "receiver-name-error");
  checkAndStoreFirstInvalidField(validationResult, "receiver-name");
  isValid &= validationResult;

  validationResult = validateLength("receiver-surname", "receiver-surname-error");
  checkAndStoreFirstInvalidField(validationResult, "receiver-surname");
  isValid &= validationResult;

  validationResult = validatePhone("receiver-phone", "receiver-phone-error");
  checkAndStoreFirstInvalidField(validationResult, "receiver-phone");
  isValid &= validationResult;

  validationResult = validateEmail("receiver-email", "receiver-email-error");
  checkAndStoreFirstInvalidField(validationResult, "receiver-email");
  isValid &= validationResult;

  validationResult = validateAddress("receiver-address", "receiver-address-error");
  checkAndStoreFirstInvalidField(validationResult, "receiver-address");
  isValid &= validationResult;
  const parcels = document.querySelectorAll(".parcel input");
  parcels.forEach(parcel => {
    validationResult = validateWeight(parcel.id, "parcel-error");
    checkAndStoreFirstInvalidField(validationResult, parcel.id);
    isValid &= validationResult;
  });

  validationResult = validateCheckbox("packing-rules", "packing-rules-error");
  checkAndStoreFirstInvalidField(validationResult, "packing-rules");
  isValid &= validationResult;

  validationResult = validateCheckbox("shipping-rules", "shipping-rules-error");
  checkAndStoreFirstInvalidField(validationResult, "shipping-rules");
  isValid &= validationResult;

  // If there's an invalid field, scroll to it
  if (firstInvalidField) {
    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

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
attachInputListener("sender-address", validateAddress, "sender-address-error");

attachInputListener("receiver-name", validateLength, "receiver-name-error");
attachInputListener("receiver-surname", validateLength, "receiver-surname-error");
attachInputListener("receiver-phone", validatePhone, "receiver-phone-error");
attachInputListener("receiver-email", validateEmail, "receiver-email-error");
attachInputListener("receiver-address", validateAddress, "receiver-address-error");

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
