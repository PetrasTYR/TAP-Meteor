// import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI';
import PageLayout from './common/Layout/PageLayout';
import { Box } from '@mui/material';

function App() {
  // * test react-query
  const { data: trafficData, error: getTrafficDataError } = useQuery(
    ['trafficData', '2021-01-01T00:00:00'],
    async () => {
      const { data } = await govtAPI.getTrafficImage('2021-01-01T00:00:00');
      return data;
    }
  )

  if (getTrafficDataError) {
    console.log('error');
    console.log(getTrafficDataError);
  }

  useEffect(() => {
    if (trafficData) {
      console.log(trafficData);
    }
  }, [trafficData])

  return (
    <>
      <PageLayout header='TAP Meteor Weather & Traffic App'>
        <Box
          sx={{
            px: 5,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Box
            sx={{
              width: '50%',
            }}>
            <h1>Components go here</h1>
          </Box>
        </Box>
      </PageLayout>
    </>
  );
}

export default App;
