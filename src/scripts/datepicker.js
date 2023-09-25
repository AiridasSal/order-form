const today = new Date();

const routeDropdown = document.getElementById('route');
const yearDropdown = document.getElementById('year');
const monthDropdown = document.getElementById('month');
const dayDropdown = document.getElementById('day');

const dateLabels = document.querySelectorAll('.date-label');

const currentYear = today.getFullYear();
const yearOption = document.createElement('option');
yearOption.value = currentYear;
yearOption.text = currentYear;
yearDropdown.appendChild(yearOption);

const currentMonth = today.getMonth();
for (let i = currentMonth; i < 12; i++) {
  const monthOption = document.createElement('option');
  monthOption.value = i + 1;
  monthOption.text = new Date(currentYear, i, 1).toLocaleString('lt-LT', { month: 'long' });
  monthDropdown.appendChild(monthOption);
}

monthDropdown.addEventListener('change', function() {
  routeDropdown.dispatchEvent(new Event('change'));
});

routeDropdown.addEventListener('change', function() {
  // Clear day dropdown
  dayDropdown.innerHTML = '';

  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.text = '';
  dayDropdown.appendChild(emptyOption);

  if (routeDropdown.value == 'route-not-selected') {
    yearDropdown.style.display = 'none';
    monthDropdown.style.display = 'none';
    dayDropdown.style.display = 'none';
    dateLabels.forEach(label => label.style.display = 'none');
    return;
  }

  yearDropdown.style.display = '';
  monthDropdown.style.display = '';
  dayDropdown.style.display = '';
  dateLabels.forEach(label => label.style.display = '');

  const year = yearDropdown.value;
  const month = monthDropdown.value - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = today.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i);

    if (month == currentMonth && i < currentDay) {
      continue;
    }

    if (routeDropdown.value == 'LT-UK' && day.getDay() == 2) {
      if (i + 1 <= daysInMonth) { // Check if the next day is within the month
        const dayOption = document.createElement('option');
        dayOption.value = `${i}-${i + 1}`;
        dayOption.text = `${i}-${i + 1}`;
        dayDropdown.appendChild(dayOption);
      }
    }

    if (routeDropdown.value == 'UK-LT' && day.getDay() == 5 && i + 1 <= daysInMonth && new Date(year, month, i + 1).getDay() == 6) {
      // Check if the Saturday is in the past
      if (!(month == currentMonth && i + 1 < currentDay)) {
        const dayOption = document.createElement('option');
        dayOption.value = `${i}-${i + 1}`;
        dayOption.text = `${i}-${i + 1}`;
        dayDropdown.appendChild(dayOption);
      }
    }
  }
});

routeDropdown.dispatchEvent(new Event('change'));
