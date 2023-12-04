const today = new Date();
const option = document.createElement('option');


const monthNames = [
  'sausio',
  'vasario',
  'kovo',
  'balandžio',
  'gegužės',
  'birželio',
  'liepos',
  'rugpjūčio',
  'rugsėjo',
  'spalio',
  'lapkričio',
  'gruodžio'
];
const routeDropdown = document.getElementById('route');
const yearDropdown = document.getElementById('year');
const monthDropdown = document.getElementById('month');
const dayDropdown = document.getElementById('day');
const deliveryDate = document.getElementById('delivery-date')
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

function isDateInPast(year, month, day) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const checkDate = new Date(year, month, day);
  return checkDate < today;
}

routeDropdown.addEventListener('change', function() {
  const month = parseInt(monthDropdown.value);
  const route = routeDropdown.value;
  while (dayDropdown.firstChild) {
    dayDropdown.removeChild(dayDropdown.firstChild);
  }
  if (month == 12) {
    if (route == 'LT-UK') {
      addDayOption('5-6', '5-6');
      addDayOption('13-15', '13-15');
      return; // Prevent further options from being added
    } else if (route == 'UK-LT') {
      addDayOption('8-10', '8-10');
      addDayOption('17-19', '17-19');
      return; // Prevent further options from being added
    }
  }
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.text = '';
  dayDropdown.appendChild(emptyOption);

  if (routeDropdown.value == 'route-not-selected') {
    // yearDropdown.style.display = 'none';
    // monthDropdown.style.display = 'none';
    // dayDropdown.style.display = 'none';
    dateLabels.forEach(label => label.style.display = 'none');
    return;
  }

  yearDropdown.style.display = '';
  monthDropdown.style.display = '';
  dayDropdown.style.display = '';
  dateLabels.forEach(label => label.style.display = '');

  const year = yearDropdown.value;
  // const month = monthDropdown.value - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = today.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i);
    let nextDay = i + 1;
    let nextDayMonth = month;

    // Check if next day is in the next month
    if (nextDay > daysInMonth) {
      nextDay = 1;
      nextDayMonth = (month + 1) % 12;
    }
    

    if (routeDropdown.value == 'UK-LT' && day.getDay() == 5 && new Date(year, nextDayMonth, nextDay).getDay() == 6) {
      if (!(month == currentMonth && nextDay + 1 <= currentDay)) {
        const dayOption = document.createElement('option');
        dayOption.value = (nextDayMonth == month) ? `${i}-${nextDay}` : `${i}-${monthNames[nextDayMonth]} ${nextDay}`;
        dayOption.text = dayOption.value;
        dayDropdown.appendChild(dayOption);
      }
    }
  }
});
function addDayOption(value, text) {
  console.log(`Adding Day Option: ${value}, ${text}`); // Debugging
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  dayDropdown.value = '';
  dayDropdown.appendChild(option);
}
dayDropdown.addEventListener('change', function() {
  if (dayDropdown.value) {
    const [startDay, endDay] = dayDropdown.value.split('-').map(Number);
    
    const selectedMonthIndex = monthDropdown.value - 1;
    const selectedYear = parseInt(yearDropdown.value);
    
    const daysInMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();
    
    let newStartDay = startDay + 3;
    let newEndDay = endDay + 3;
    
    let deliveryStartMonthIndex = selectedMonthIndex;
    let deliveryEndMonthIndex = selectedMonthIndex;
    
    if (newEndDay > daysInMonth) {
      newEndDay = newEndDay - daysInMonth;
      deliveryEndMonthIndex = (deliveryEndMonthIndex + 1) % 12;
    }
    
    if (newStartDay > daysInMonth) {
      newStartDay = newStartDay - daysInMonth;
      deliveryStartMonthIndex = (deliveryStartMonthIndex + 1) % 12;
    }
    
    let deliveryDateString;
    if (deliveryStartMonthIndex === deliveryEndMonthIndex) {
        deliveryDateString = `${monthNames[deliveryStartMonthIndex]} ${newStartDay}-${newEndDay}d.`;
    } else if (dayDropdown.value === '31-1') {
        deliveryDateString = `${monthNames[deliveryStartMonthIndex]} ${newStartDay}-${newEndDay}d.`;
    } else {
        deliveryDateString = `${monthNames[deliveryStartMonthIndex]} ${newStartDay}-${monthNames[deliveryEndMonthIndex]} ${newEndDay}d.`;
    }
    
    deliveryDate.textContent = `Numatoma užsakymo pristatymo data: ${deliveryDateString}`;
    
  } else {
    deliveryDate.textContent = '';
  }
});

routeDropdown.dispatchEvent(new Event('change'));

