import React, { useState, useEffect } from 'react';

const RunData = () => {
  // address of api call
  const apiCall = 'https://www.strava.com/api/v3/athlete';
  const apiKey = process.env.REACT_APP_STRAVA_ACCESS_TOKEN;

  // state for data return
  const [data, setData] = useState(null);

  // VO2 max function

  // fetch call to api
  useEffect(() => {
    fetch(apiCall, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + apiKey,
      })
    })
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error('Error:', error));
  }, []);

  return <>
    {/* Display API call */}
    <pre>
      <div style={{ backgroundColor: 'lightgrey', borderRadius: 2, padding: 2, display: 'inline-block' }}>
        API call: {apiCall}
      </div>
    </pre>
    
    {/* Display returned value */}
    <pre>
      <div style={{ backgroundColor: 'lightgrey', borderRadius: 2, padding: 2, display: 'inline-block' }}>
        Returned Value from Time Series Data
      </div>
    </pre>

    {/* Display vo2 max */}
        <pre>
      <div style={{ backgroundColor: 'lightgrey', borderRadius: 2, padding: 2, display: 'inline-block' }}>
        vo2 max: 
      </div>
    </pre>

    {/* Display returned JSON */}
    { data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...' }
  </>;
}

export default RunData;
