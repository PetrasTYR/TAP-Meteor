// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI'
import PageLayout from './common/Layout/PageLayout'
import { Box } from '@mui/material'
import DateTimeForm from './components/DateTimeForm/DateTimeForm'

function App() {
    const [selectedDate, setSelectedDate] = useState()
    const [selectedTime, setSelectedTime] = useState()

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time)
    }

    // * test react-query
    const { data: trafficData, error: getTrafficDataError } = useQuery(
        ['trafficData', '2021-01-01T00:00:00'],
        async () => {
            const { data } = await govtAPI.getTrafficImage(
                '2021-01-01T00:00:00'
            )
            return data
        }
    )

    if (getTrafficDataError) {
        console.log('error')
        console.log(getTrafficDataError)
    }

    useEffect(() => {
        if (trafficData) {
            console.log(trafficData)
        }
    }, [trafficData])
    console.log(selectedDate)
    console.log(selectedTime)

    return (
        <>
            <PageLayout header='TAP Meteor Weather & Traffic App'>
                <Box
                    sx={{
                        // px: 5,
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: '50%'
                        }}
                    >
                        <h1>Components go here</h1>
                        <DateTimeForm
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            handleDateChange={handleDateChange}
                            handleTimeChange={handleTimeChange}
                        />
                    </Box>
                </Box>
            </PageLayout>
        </>
    )
}

export default App
