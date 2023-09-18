// // popup.js
// document.addEventListener("DOMContentLoaded", () => {
//     // Create the popup container
//     const popup = document.createElement("div");
//     popup.id = "popup";
//     popup.classList.add("container"); // Existing CSS class for styling
//     popup.style.display = "none";
//     popup.style.position = "fixed";
//     popup.style.top = "0";
//     popup.style.left = "0";
//     popup.style.width = "100%";
//     popup.style.height = "100%";
//     popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  
//     // Create popup content container
//     const content = document.createElement("div");
//     content.classList.add("content"); // Existing CSS class for styling
//     content.style.position = "absolute";
//     content.style.top = "50%";
//     content.style.left = "50%";
//     content.style.transform = "translate(-50%, -50%)";
//     content.style.backgroundColor = "#fff";
//     content.style.padding = "20px";
//     content.style.borderRadius = "8px";
  
//     // Create the close button
//     const closeButton = document.createElement("span");
//     closeButton.innerHTML = "&times;";
//     closeButton.style.cursor = "pointer";
    
//     // Create the information message
//     const infoMessage = document.createElement("p");
//     infoMessage.innerText = "Pavedimas turi būti atliktas iki siunta bus įteikta gavėjui.";
    
//     // Add event listener to close button
//     closeButton.addEventListener("click", () => {
//       popup.style.display = "none";
//     });
    
//     // Append elements
//     content.appendChild(closeButton);
//     content.appendChild(infoMessage);
//     popup.appendChild(content);
//     document.body.appendChild(popup);
  
//     // Listen for changes in payment type
//     const paymentTypeSelect = document.getElementById("payment-type");
//     if (paymentTypeSelect) {
//       paymentTypeSelect.addEventListener("change", (e) => {
//         if (e.target.value === "pavedimu") {
//           popup.style.display = "block";
//         }
//       });
//     }
//   });
  