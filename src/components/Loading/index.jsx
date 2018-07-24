import React from 'react';

function Loading({ error, pastDelay }) {
  if (error) {
    return (
      <div>
        Loading chunk failed!
      </div>
    );
  }
  if (pastDelay) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return null;
}

export default Loading;
