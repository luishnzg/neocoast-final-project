import React from 'react';

import './errorPage.scss';

const ErrorPage = () => (
  <div className="error-page">
    <h1>The route doesn&apos;t exist</h1>
    <img
      className="error-page__image"
      src="https://i.ibb.co/kS3tgt3/232.jpg"
      alt="not found"
    />
  </div>
);

export default ErrorPage;
