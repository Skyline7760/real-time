// Initialize Firebase with your Firebase project's configuration
const firebaseConfig = {
      apiKey: "AIzaSyC3d5hTIgGdAQh_kaFFZ_p1tQoD14NVAoQ",
  authDomain: "thesis-5578f.firebaseapp.com",
  databaseURL: "https://thesis-5578f-default-rtdb.firebaseio.com",
  projectId: "thesis-5578f",
  storageBucket: "thesis-5578f.appspot.com",
  messagingSenderId: "875410958551",
  appId: "1:875410958551:web:98c75bbc019e349c24e892"
  // Your Firebase configuration here
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize a Chart.js chart
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],  // Timestamps will go here
        datasets: [{
            label: 'Real-time Data',
            data: [],  // Data values will go here
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to update the chart with new data
function updateChart(timestamp, value) {
    chart.data.labels.push(timestamp);
    chart.data.datasets[0].data.push(value);
    
    // Remove old data if the chart becomes too long
    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    
    chart.update();
}

// Listen for changes in your Firebase database
database.ref('/test/envelopes').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const timestamp = data.timestamp;
    const value = data.value;
    
    // Call the updateChart function to add new data points
    updateChart(timestamp, value);
});
