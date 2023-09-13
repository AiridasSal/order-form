document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[data-tooltip]');
    
    inputs.forEach(input => {
      const tooltipText = input.getAttribute('data-tooltip');
      
      // Create tooltip button
      const tooltipBtn = document.createElement('button');
      tooltipBtn.classList.add('tooltip-btn');
      tooltipBtn.innerHTML = 'i';
      tooltipBtn.addEventListener('click', function() {
        this.nextElementSibling.style.display = 
          this.nextElementSibling.style.display === "block" ? "none" : "block";
      });
  
      // Create tooltip div
      const tooltipDiv = document.createElement('div');
      tooltipDiv.classList.add('tooltip');
      tooltipDiv.innerHTML = tooltipText;
  
      // Append elements
      const container = document.createElement('div');
      container.classList.add('input-container');
      container.style.position = 'relative';
      
      input.parentNode.insertBefore(container, input);
      container.appendChild(input);
      container.appendChild(tooltipBtn);
      container.appendChild(tooltipDiv);
    });
  });
  