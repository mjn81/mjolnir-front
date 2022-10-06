import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({
  data,
}: {
  data: any;
}) => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};
