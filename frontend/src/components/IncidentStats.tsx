import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchIncidentStats } from '../services/ticketService';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

interface IncidentStatsProps {
  refreshKey: number;
}

interface StatPoint {
  label: string;
  count: number;
}

interface StatsResponse {
  [key: string]: StatPoint[];
}

const TIME_RANGES = ['Daily', 'Weekly', 'Monthly'];

const IncidentStats: React.FC<IncidentStatsProps> = ({ refreshKey }) => {
  const [range, setRange] = useState<string>('Daily');
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);

  const isChartEmpty =
    !chartData ||
    !chartData.datasets ||
    chartData.datasets.every((ds) => !ds.data || ds.data.every((v) => v === 0));


  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchIncidentStats(range);
        setChartData(formatChartData(response.data));
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    loadStats();
  }, [range, refreshKey]);

  const formatChartData = (data: StatsResponse): ChartData<'line'> => {
    const labelsSet: Set<string> = new Set();

    Object.values(data).forEach((series) => {
      series.forEach((point) => labelsSet.add(point.label));
    });

    const labels = Array.from(labelsSet).sort();

    const colors: Record<
      string,
      { color: string; pointStyle: 'circle' | 'rect' | 'rectRot' | 'triangle' }
    > = {
      Raised: { color: 'rgba(59, 130, 246, 1)', pointStyle: 'rectRot' },
      Open: { color: 'gold', pointStyle: 'circle' },
      Closed: { color: 'gray', pointStyle: 'rect' },
      Breached: { color: 'red', pointStyle: 'triangle' },
    };

    const datasets: ChartDataset<'line'>[] = Object.keys(data).map((key) => {
      const labelToCount: Record<string, number> = Object.fromEntries(
        data[key].map((d) => [d.label, d.count])
      );

      return {
        label: `Number of ${key} Tickets`,
        data: labels.map((date) => labelToCount[date] || 0),
        borderColor: colors[key]?.color || 'black',
        backgroundColor: colors[key]?.color || 'black',
        pointStyle: colors[key]?.pointStyle || 'circle',
        pointRadius: 10,
        pointHoverRadius: 12,
        borderWidth: 2,
        fill: false,
        tension: 0.25,
        datalabels: {
          display: true,
          color: 'white',
          font: {
            size: 10,
            weight: 'bold',
          },
          formatter: (value: number) => value,
          anchor: 'center',
          align: 'center',
          clip: false,
        },
      };
    });

    return { labels, datasets };
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 2,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: {
        display: true,
        color: 'white',
        font: { weight: 'bold', size: 10 },
        formatter: (value: number) => value,
        anchor: 'center',
        align: 'center',
        clamp: true,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (v) => (Number.isInteger(v) ? v : null),
        },
      },
    },
  };

  return (
    <div className="card">
      <div className="flex-between-center">
        <h2 className="section-title">Incident Trends</h2>
        <select
          className="dropdown-base"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          {TIME_RANGES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {!chartData ? (
        <p className="status-message">Loading chart...</p>
      ) : isChartEmpty ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 space-y-2">
          <span className="text-4xl">📉</span>
          <p className="text-sm">No chart data available for this time range.</p>
        </div>
      ) : (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

    </div>
  );
};

export default IncidentStats;
