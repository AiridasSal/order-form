document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const monthNames = ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'];
    const deliveryDate = document.getElementById('delivery-date')
    const routeDropdown = document.getElementById('route');
    const yearDropdown = document.getElementById('year');
    const monthDropdown = document.getElementById('month');
    const dayDropdown = document.getElementById('day');

    addYearOption(currentYear);
    addYearOption(2024);

    yearDropdown.addEventListener('change', function() {
        monthDropdown.innerHTML = '';
        if (parseInt(yearDropdown.value) === 2023) {
            addMonthOption(12, 2023); 
        } else {
            addMonthOption(1, 2024); 
            addMonthOption(2, 2024); 
        }
        updateDayOptions();
    });

    if (currentYear === 2023) {
        addMonthOption(12, 2023); 
    }

    routeDropdown.addEventListener('change', updateDayOptions);
    monthDropdown.addEventListener('change', updateDayOptions);

    function addYearOption(year) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearDropdown.appendChild(option);
    }

    function addMonthOption(monthIndex, year) {
        const option = document.createElement('option');
        option.value = monthIndex;
        option.text = monthNames[monthIndex - 1]; 
        monthDropdown.appendChild(option);
    }

    function updateDayOptions() {
        dayDropdown.innerHTML = '';
        addEmptyDayOption(); 

        const selectedYear = parseInt(yearDropdown.value);
        const selectedMonth = parseInt(monthDropdown.value);
        const route = routeDropdown.value;

        if (selectedYear === 2023 && selectedMonth === 12) { 
            if (route === 'LT-UK') {
                addDayOption('13-15', '13-15');
            } else if (route === 'UK-LT') {
                addDayOption('17-19', '17-19');
            }
            return;
        }

        if (selectedYear === 2024) {
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); 
            for (let day = 1; day <= daysInMonth; day += 7) {
                let startDay = day;
                let endDay = startDay + 1;

                if (route === 'UK-LT') {
                    startDay += 3;
                    endDay += 3;
                }

                if (endDay <= daysInMonth) {
                    addDayOption(`${startDay}-${endDay}`, `${startDay}-${endDay}`);
                }
            }
        }
    }

    function addDayOption(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.text = text;
        dayDropdown.appendChild(option);
    }

    function addEmptyDayOption() {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.text = 'pasirinkite';
        dayDropdown.appendChild(emptyOption);
    }

    yearDropdown.dispatchEvent(new Event('change'));

    dayDropdown.addEventListener('change', function() {
        if (dayDropdown.value) {
          const [startDay, endDay] = dayDropdown.value.split('-').map(Number);
          
          const selectedMonthIndex = parseInt(monthDropdown.value) - 1;
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
      
});
