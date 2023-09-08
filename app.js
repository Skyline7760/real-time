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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your Firebase Realtime Database
const database = firebase.database();

// Create an empty array to store data for the chart
const chartData = {
  labels: [], // Timestamps
  values: []  // Values
};

// Get a reference to the canvas element and create the Chart.js chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: chartData.labels,
    datasets: [{
      label: 'Value',
      data: chartData.values,
      borderColor: 'rgba(75, 192, 192, 1)',
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
        min: 0,
        max: 100
      }
    }
  }
});

// Listen for changes in your Firebase Realtime Database
database.ref('your_data_path').on('value', (snapshot) => {
  const data = snapshot.val();
  
  // Extract timestamp and value from the Firebase data
  const timestamp = data.timestamp;
  const value = data.value;

  // Update the chart data
  chartData.labels.push(timestamp);
  chartData.values.push(value);

  // Remove old data points if you want to limit the number of points displayed
  if (chartData.labels.length > 10) {
    chartData.labels.shift();
    chartData.values.shift();
  }

  // Update the chart
  myChart.update();
});
