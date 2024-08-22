import { Helmet } from 'react-helmet';
import React from 'react';

interface AppsProps {}

const Apps: React.FC = () => {
  const title = 'Applications';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>
        </div>
      </div>
    </>
  );
}

export default Apps;