import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DoughnutChart,
  PaperCard,
  UsageChart,
} from 'components';
import { useAuthStore } from 'context';
import React from 'react';

const HomePage = () => {
  return (
    <section>
      <PaperCard className="w-1/5">
        <UsageChart />
      </PaperCard>
    </section>
  );
};

export default HomePage;
