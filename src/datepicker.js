// Get today's date
const today = new Date();

// Get dropdown elements
const routeDropdown = document.getElementById('route');
const yearDropdown = document.getElementById('year');
const monthDropdown = document.getElementById('month');
const dayDropdown = document.getElementById('day');

// Get label elements
const dateLabels = document.querySelectorAll('.date-label');

// Populate year dropdown with current year
const currentYear = today.getFullYear();
const yearOption = document.createElement('option');
yearOption.value = currentYear;
yearOption.text = currentYear;
yearDropdown.appendChild(yearOption);

// Populate month dropdown with all months except previous
const currentMonth = today.getMonth();
for (let i = currentMonth; i < 12; i++) {
  const monthOption = document.createElement('option');
  monthOption.value = i + 1; // Adjusted here
  monthOption.text = new Date(currentYear, i, 1).toLocaleString('lt-LT', { month: 'long' });
  monthDropdown.appendChild(monthOption);
}

// Reset day dropdown when month is changed
monthDropdown.addEventListener('change', function() {
  routeDropdown.dispatchEvent(new Event('change'));
});

// Populate day dropdown based on selected route
routeDropdown.addEventListener('change', function() {
  // Clear day dropdown
  dayDropdown.innerHTML = '';

  // Add an empty option to the day dropdown
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.text = '';
  dayDropdown.appendChild(emptyOption);

  // Hide day dropdown and labels if no route is selected
  if (routeDropdown.value == 'route-not-selected') {
    yearDropdown.style.display = 'none';
    monthDropdown.style.display = 'none';
    dayDropdown.style.display = 'none';
    dateLabels.forEach(label => label.style.display = 'none');
    return;
  }

  // Show dropdowns and labels
  yearDropdown.style.display = '';
  monthDropdown.style.display = '';
  dayDropdown.style.display = '';
  dateLabels.forEach(label => label.style.display = '');

  // Get number of days in selected month
  const year = yearDropdown.value;
  const month = monthDropdown.value - 1; // Adjusted here
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Populate day dropdown
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i); // Adjusted here

    // Only add Wednesdays for LT-UK route
    if (routeDropdown.value == 'LT-UK' && day.getDay() == 3) {
      const dayOption = document.createElement('option');
      dayOption.value = i;
      dayOption.text = i;
      dayDropdown.appendChild(dayOption);
    }

    // Add Fridays and Saturdays as a single option for UK-LT route
    if (routeDropdown.value == 'UK-LT' && day.getDay() == 5 && i + 1 <= daysInMonth && new Date(year, month, i + 1).getDay() == 6) { // Adjusted here
      const dayOption = document.createElement('option');
      dayOption.value = `${i}-${i + 1}`;
      dayOption.text = `${i}-${i + 1}`;
      dayDropdown.appendChild(dayOption);
    }
  }
});

// Trigger change event to populate day dropdown for current route
routeDropdown.dispatchEvent(new Event('change'));
