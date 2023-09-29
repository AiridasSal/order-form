let latestAdjustedPrice = 0;
let latestCurrency = "€";

const priceElement = document.getElementById("estimated-price");

function removeParcel(button) {
  const parcelContainer = document.getElementById("parcelContainer");

  const parcelToRemove = button.closest(".parcel");
  parcelContainer.removeChild(parcelToRemove);

  const parcels = parcelContainer.getElementsByClassName("parcel-items");
  for (let i = 1; i < parcels.length; i++) {
    const label = parcels[i].getElementsByTagName("label")[0];
    const input = parcels[i].getElementsByTagName("input")[0];

    label.setAttribute("for", `parcel${i + 1}`);
    label.textContent = `Papildomos siuntos Nr. ${i + 1} svoris:`;
    input.setAttribute("id", `parcel${i + 1}`);
    input.setAttribute("name", `parcel${i + 1}`);
  }

  updateEstimatedPrice();
}

function calculateEstimatedPrice(parcels, route, payer) {
  let basePrice = getBasePrice(parcels);

  const { adjustedPrice, currency } = adjustPriceAndCurrency(
    basePrice,
    route,
    payer
  );

  latestAdjustedPrice = adjustedPrice;
  latestCurrency = currency;

  return { price: adjustedPrice, currency };
}

function getBasePrice(parcels) {
  const priceUpTo5kg = 35;
  const priceUpTo15kg = 40;
  const priceUpTo30kg = 45;

  const parcelPrices = parcels.map((weight) => {
    if (weight <= 5) {
      return priceUpTo5kg;
    } esle if (weight > 5 && weight <= 15){
      return priceUpTo15kg;
    } else if (weight > 15 && weight <= 30) {
      return priceUpTo30kg;
    } else if (weight > 30 && weight <= 50) {
      return price5to30kg + (weight - 30) * 1.49;
    } else if (weight > 50 && weight <= 100) {
      return price5to30kg + (weight - 30) * 1.46;
    } else if (weight > 100 && weight <= 200) {
      return price5to30kg + (weight - 30) * 1.36;
    } else if (weight > 200 && weight <= 400) {
      return price5to30kg + (weight - 30) * 1.12;
    } else if (weight > 400 && weight <= 600) {
      return price5to30kg + (weight - 30) * 1.04;
    } else {
      return price5to30kg + (weight - 30) * 0.95;
    }
  });

  const totalPrice = parcelPrices.reduce((sum, price) => sum + price, 0);

  const discount = getDiscount(parcelPrices.length);

  const finalPrice = totalPrice * (1 - discount);
  const roundedPrice = parseFloat(finalPrice.toFixed(2));

  return roundedPrice;
}

function adjustPriceAndCurrency(basePrice, route, payer) {
  let adjustedPrice = basePrice;
  let currency = "€";

  if (route === "LT-UK") {
    if (payer === "gavėjas") {
      adjustedPrice = basePrice * 0.85;
      currency = "£";
    }
  } else if (route === "UK-LT") {
    if (payer === "siuntėjas") {
      currency = "£";
    } else if (payer === "gavėjas") {
      adjustedPrice = basePrice * 1.15;
    }
  }
  return { adjustedPrice, currency };
}

function getDiscount(numberOfParcels) {
  if (numberOfParcels >= 5) {
    return 0.2;
  } else if (numberOfParcels >= 4) {
    return 0.15;
  } else if (numberOfParcels >= 3) {
    return 0.1;
  } else if (numberOfParcels >= 2) {
    return 0.05;
  } else {
    return 0;
  }
}
