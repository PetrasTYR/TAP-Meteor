// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
// import './App.css'
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI'
import PageLayout from './common/Layout/PageLayout'
import { Box } from '@mui/material'
import DateTimeForm from './components/DateTimeForm/DateTimeForm'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

function App() {
    const [selectedDate, setSelectedDate] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [formattedDate, setFormattedDate] = useState()
    const [cameraData, setCameraData] = useState()

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time)
    }

    const handleView = () => {
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD')
        const formattedTime = dayjs(selectedTime).format('HH:mm:ss')
        setFormattedDate(`${formattedDate}T${formattedTime}`)
    }

    const { data: trafficData, error: getTrafficDataError } = useQuery(
        ['trafficData', formattedDate],
        async () => {
            const { data } = await govtAPI.getTrafficImage(formattedDate)
            return data
        }
    )

    if (getTrafficDataError) {
        toast.error('Error fetching traffic data. Please try again later.')
    }

    useEffect(() => {
        if (trafficData) {
            setCameraData(trafficData.items[0].cameras)
            toast.success('Traffic data fetched successfully.')
        }
    }, [trafficData])

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
                            handleView={handleView}
                        />
                    </Box>
                </Box>
            </PageLayout>
        </>
    )
}

export default App
