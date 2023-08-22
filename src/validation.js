function validateAddress(address) {
  const regex = /([A-Za-z\s]+),\s*([\d\/A-Za-z\s]+),\s*([\d\/A-Za-z\s]+)/;
  return regex.test(address);
}
function isValidWeight(weight) {
  const weightValue = parseFloat(weight);
  return weight && weightValue >= 0.1 && weightValue === Math.abs(weightValue);
}
function validateForm() {
  let isValid = true;

  // Sender Name Validation
  const senderName = document.getElementById("sender-name");
  const senderNameError = document.getElementById("sender-name-error");
  if (senderName.value.length < 3) {
    senderNameError.textContent = "Vardo ilgis turi būti bent 3 simboliai.";
    isValid = false;
  } else {
    senderNameError.textContent = "";
  }

  // Sender Surname Validation
  const senderSurname = document.getElementById("sender-surname");
  const senderSurnameError = document.getElementById("sender-surname-error");
  if (senderSurname.value.length < 3) {
    senderSurnameError.textContent =
      "Pavardės ilgis turi būti bent 3 simboliai.";
    isValid = false;
  } else {
    senderSurnameError.textContent = "";
  }

  // Sender Phone Validation
  const senderPhone = document.getElementById("sender-phone");
  const senderPhoneError = document.getElementById("sender-phone-error");
  if (!senderPhone.value.match(/^\+\d+/)) {
    senderPhoneError.textContent =
      'Neteisingas telefono formatas. Turi prasidėti nuo "+" ir sekti skaičiai.';
    isValid = false;
  } else {
    senderPhoneError.textContent = "";
  }

  // Sender Email Validation
  const senderEmail = document.getElementById("sender-email");
  const senderEmailError = document.getElementById("sender-email-error");
  if (
    !senderEmail.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  ) {
    senderEmailError.textContent = "Neteisingas el. pašto formatas.";
    isValid = false;
  } else {
    senderEmailError.textContent = "";
  }

  // Sender Address Validation
  const senderAddress = document.getElementById("sender-address");
  const senderAddressError = document.getElementById("sender-address-error");
  if (!validateAddress(senderAddress.value)) {
    senderAddressError.textContent =
      "Adresas turi turėti miestą, gatvę ir pastato numerį.";
    isValid = false;
  } else {
    senderAddressError.textContent = "";
  }

  // Receiver Name Validation
  const receiverName = document.getElementById("receiver-name");
  const receiverNameError = document.getElementById("receiver-name-error");
  if (receiverName.value.length < 3) {
    receiverNameError.textContent = "Vardo ilgis turi būti bent 3 simboliai.";
    isValid = false;
  } else {
    receiverNameError.textContent = "";
  }

  // Receiver Surname Validation
  const receiverSurname = document.getElementById("receiver-surname");
  const receiverSurnameError = document.getElementById(
    "receiver-surname-error"
  );
  if (receiverSurname.value.length < 3) {
    receiverSurnameError.textContent =
      "Pavardės ilgis turi būti bent 3 simboliai.";
    isValid = false;
  } else {
    receiverSurnameError.textContent = "";
  }

  // Receiver Phone Validation
  const receiverPhone = document.getElementById("receiver-phone");
  const receiverPhoneError = document.getElementById("receiver-phone-error");
  if (!receiverPhone.value.match(/^\+\d+/)) {
    receiverPhoneError.textContent =
      'Neteisingas telefono formatas. Turi prasidėti nuo "+" ir sekti skaičiai.';
    isValid = false;
  } else {
    receiverPhoneError.textContent = "";
  }

  // Receiver Email Validation
  const receiverEmail = document.getElementById("receiver-email");
  const receiverEmailError = document.getElementById("receiver-email-error");
  if (
    !receiverEmail.value.match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )
  ) {
    receiverEmailError.textContent = "Neteisingas el. pašto formatas.";
    isValid = false;
  } else {
    receiverEmailError.textContent = "";
  }

  // Receiver Address Validation
  const receiverAddress = document.getElementById("receiver-address");
  const receiverAddressError = document.getElementById(
    "receiver-address-error"
  );
  if (!validateAddress(receiverAddress.value)) {
    receiverAddressError.textContent =
      "Adresas turi turėti miestą, gatvę ir pastato numerį.";
    isValid = false;
  } else {
    receiverAddressError.textContent = "";
  }
  // Route Validation
  const route = document.getElementById("route");
  const routeError = document.getElementById("route-error");
  routeError.textContent = "Pasirinkite kryptį";
  if (route.value === "route-not-selected") {
    isValid = false;
  } else {
    routeError.textContent = "";
  }
  //Date Validation
  const day = document.getElementById("day");
  const dateError = document.getElementById("date-error");
  if (day.value === "") {
    dateError.textContent = "Pasirinkite užsakymo paėmimo dieną";
    isValid = false;
  } else {
    dateError.textContent = "";
  }
  // Order Email Validation
  const orderEmail = document.getElementById("order-email");
  const orderEmailError = document.getElementById("order-email-error");
  if (
    !orderEmail.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  ) {
    orderEmailError.textContent = "Neteisingas el. pašto formatas.";
    isValid = false;
  } else {
    orderEmailError.textContent = "";
  }

  // Payer Validation
  const payer = document.getElementById("payer");
  const payerError = document.getElementById("payer-error");
  if (!payer.value) {
    payerError.textContent = "Pasirinkite mokėtoją.";
    isValid = false;
  } else {
    payerError.textContent = "";
  }

  // Payment Type Validation
  const paymentType = document.getElementById("payment-type");
  const paymentTypeError = document.getElementById("payment-type-error");
  if (!paymentType.value) {
    paymentTypeError.textContent = "Pasirinkite atsiskaitymo tipą.";
    isValid = false;
  } else {
    paymentTypeError.textContent = "";
  }

  // Invoice Fields Validation (only if the checkbox is checked)
  const invoiceCheckbox = document.getElementById("invoice-checkbox");
  if (invoiceCheckbox.checked) {
    const companyName = document.getElementById("company-name");
    const companyNameError = document.getElementById("company-name-error");
    if (companyName.value.length < 3) {
      companyNameError.textContent =
        "Įmonės pavadinimas turi būti bent 3 simboliai.";
      isValid = false;
    } else {
      companyNameError.textContent = "";
    }

    const companyCode = document.getElementById("company-code");
    const companyCodeError = document.getElementById("company-code-error");
    if (!companyCode.value) {
      companyCodeError.textContent = "Įveskite įmonės kodą.";
      isValid = false;
    } else {
      companyCodeError.textContent = "";
    }

    const companyAddress = document.getElementById("company-address");
    const companyAddressError = document.getElementById(
      "company-address-error"
    );
    if (!validateAddress(companyAddress.value)) {
      companyAddressError.textContent =
        "Adresas turi turėti miestą, gatvę ir pastato numerį.";
      isValid = false;
    } else {
      companyAddressError.textContent = "";
    }

    const companyEmail = document.getElementById("company-email");
    const companyEmailError = document.getElementById("company-email-error");
    if (
      !companyEmail.value.match(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      )
    ) {
      companyEmailError.textContent = "Neteisingas el. pašto formatas.";
      isValid = false;
    } else {
      companyEmailError.textContent = "";
    }
  }
  // Parcels Weight Validation
  const parcels = document.querySelectorAll(".parcel input");
  const parcelError = document.getElementById("parcel-error");
  let allWeightsValid = true;
  parcels.forEach((parcel) => {
    if (!isValidWeight(parcel.value)) {
      allWeightsValid = false;
    }
  });

  if (!allWeightsValid) {
    parcelError.textContent =
      "Prašome įvesti teisingą svorį kiekvienai siuntai. Minimalus svoris yra 0.1.";
    isValid = false;
  } else {
    parcelError.textContent = "";
  }
  const submitErrorField = document.getElementById("submit-error");
  if (!isValid) {
    submitErrorField.textContent = "Formoje yra klaidų. Prašome patikrinti.";
  } else {
    submitErrorField.textContent = "";
  }
  return isValid;
}
