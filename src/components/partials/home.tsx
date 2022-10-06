import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DoughnutChart } from 'components/charts';
import { useAuthStore } from 'context';
import React from 'react'

export const UsageChart = () => {
  const user = useAuthStore(
    (state) => state.user,
  );
  const { used, limit } = user.usage;
  const free = (
    BigInt(limit) - BigInt(used)
  ).toString();
  return (
    <>
      <h3 className="font-bold text-xl space-x-2">
        <FontAwesomeIcon icon={faDatabase} />
        <span>usage</span>
      </h3>
      <DoughnutChart
        data={{
          labels: ['used', 'free'],
          datasets: [
            {
              label: '# of Votes',
              data: [used, free],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </>
  );
}
