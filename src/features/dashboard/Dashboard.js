import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'Monthly Sales',
      data: [1000, 2000, 1800, 2200, 2400, 2100, 2500, 2300, 2700],
      fill: false,
      borderColor: '#111827', // Neutral blackish for line
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#374151', // Gray-700
        font: {
          weight: '600',
          size: 14,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.75)',
      titleFont: { weight: '600' },
      bodyFont: { size: 14 },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#e5e7eb', // gray-200 grid lines
      },
      ticks: {
        color: '#6b7280',
        font: { size: 13 },
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: '#6b7280',
        font: { size: 13 },
      },
    },
  },
};

const Dashboard = () => {
  return (
    <main className="max-w-7xl mx-auto p-6 select-none">
      <h1 className="text-5xl font-extrabold mb-12 text-black">Dashboard</h1>
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sales Overview</h2>
        <Line data={data} options={options} />
      </section>
    </main>
  );
};

export default Dashboard; // Ensure this line is present
