import React from 'react';

import {
  PaperCard,
  UsageChart,
} from 'components';

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
