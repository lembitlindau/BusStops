// js/app.js

// Normalize a string for use in IDs or keys (removing special characters)
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

// Initialize departures with data from localStorage or default empty arrays
const departures = JSON.parse(localStorage.getItem('busSchedule')) || {
    Lehmja: {
        weekday: [],
        weekend: []
    },
    Tornimäe: {
        weekday: [],
        weekend: []
    },
};
debugger;
// Function to determine if today is a weekend
function isWeekend() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
}


// Function to save departures to localStorage
function saveToLocalStorage() {
    localStorage.setItem('busSchedule', JSON.stringify(departures));
}

// Function to add a new departure
function addDeparture(stop, time) {
    // Add the time to the stop's list
    departures[stop].push(time);
    // Sort times in ascending order
    departures[stop].sort();
    // Save to localStorage and update the UI
    saveToLocalStorage();
    updateUI();
}

// Function to remove a departure
function removeDeparture(stop, time) {
    // Filter out the departure time from the stop's list
    departures[stop] = departures[stop].filter((t) => t !== time);
    // Save to localStorage and update the UI
    saveToLocalStorage();
    updateUI();
}

// Function to get current time in minutes since midnight
function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

// Function to convert time string "HH:MM" to minutes since midnight
function timeStringToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Function to format minutes back to "HH:MM"
function minutesToTimeString(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Function to get next three departures based on current time
function getNextDepartures(stop) {
    const allTimes = departures[stop].map(timeStringToMinutes).sort((a, b) => a - b);
    const currentTime = getCurrentTimeInMinutes();
    const upcoming = allTimes.filter(time => time >= currentTime);
    const nextThree = upcoming.slice(0, 3);

    // If less than three, wrap around to the next day
    if (nextThree.length < 3) {
        const remaining = 3 - nextThree.length;
        const startOfDay = allTimes.slice(0, remaining);
        return [...nextThree, ...startOfDay].map(minutesToTimeString);
    }

    return nextThree.map(minutesToTimeString);
}

// Object to track the display state for each stop
const displayState = {
    Lehmja: false,      // false means showing next three
    Tornimäe: false,
};

// Function to update the UI
function updateUI() {
    // Update the list for each bus stop
    Object.keys(departures).forEach((stop) => {
        const normalizedStop = normalizeString(stop);
        const list = document.getElementById(`${normalizedStop}-list`);
        list.innerHTML = ''; // Clear the list

        let departuresToShow = [];

        if (displayState[stop]) {
            // Show all departures
            departuresToShow = departures[stop].slice().sort();
        } else {
            // Show next three departures
            departuresToShow = getNextDepartures(stop);
        }

        // Add each departure time as a list item with a remove button
        departuresToShow.forEach((time) => {
            const listItem = document.createElement('li');

            const timeSpan = document.createElement('span');
            timeSpan.textContent = time;

            // Create a "Remove" button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeDeparture(stop, time);

            // Append elements to the list item
            listItem.appendChild(timeSpan);
            listItem.appendChild(removeButton);
            list.appendChild(listItem);
        });

        // Update the toggle button text
        const toggleButton = document.querySelector(`.toggle-button[data-stop="${stop}"]`);
        if (displayState[stop]) {
            toggleButton.textContent = 'Show Less';
        } else {
            toggleButton.textContent = 'Show All';
        }
    });
}

// Function to handle toggle button clicks
function handleToggle(event) {
    const stop = event.target.getAttribute('data-stop');
    if (stop) {
        displayState[stop] = !displayState[stop];
        updateUI();
    }
}

// Handle form submission
document.getElementById('bus-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const stop = document.getElementById('stop').value;
    const time = document.getElementById('time').value;

    // Add the new departure and update UI
    addDeparture(stop, time);

    // Clear the time input
    document.getElementById('time').value = '';
});

// Add event listeners to toggle buttons
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', handleToggle);
});

// Initial UI update when the page loads
updateUI();

// Optional: Update the UI every minute to reflect real-time departures
setInterval(updateUI, 60000);
