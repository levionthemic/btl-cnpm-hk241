const pieChart = document.getElementById("pieChart");
const barChart = document.getElementById("barChart");

const numbers = document.querySelectorAll(".inner-paper .inner-item .inner-number");
let data = [];
numbers.forEach(number => {
  data.push(parseInt(number.innerText));
})
new Chart(pieChart, {
  type: "doughnut",
  data: {
    labels: ["A0", "A1", "A2", "A3", "A4"],
    datasets: [
      {
        label: "Số lượng",
        data: data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 13)",
          "rgb(54, 162, 2)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});

new Chart(barChart, {
  type: "bar",
  data: {
    labels: ["A0", "A1", "A2", "A3", "A4"],
    datasets: [{
      label: 'Số lượng',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
})
