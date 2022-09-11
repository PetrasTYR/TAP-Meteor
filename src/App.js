// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
// import './App.css'
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI'
import PageLayout from './common/Layout/PageLayout'
import { Box, Button } from '@mui/material'
import DateTimeForm from './components/DateTimeForm/DateTimeForm'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'

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
        const formattedTime = dayjs(selectedTime).second(0).format('HH:mm:ss')
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

    const rows = cameraData?.map((camera, index) => {
        return {
            id: camera.camera_id,
            index,
            image: camera.image,
            location: camera.location,
            image_metadata: camera.image_metadata
        }
    })
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'location', headerName: 'Location', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                const camera = params.row
                return <Button href={camera.image}>View Image</Button>
            }
        }
    ]

    return (
        <>
            <PageLayout header='TAP Meteor Weather & Traffic App'>
                <Box
                    sx={{
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
                        <DateTimeForm
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            handleDateChange={handleDateChange}
                            handleTimeChange={handleTimeChange}
                            handleView={handleView}
                        />
                        <Box
                            sx={{
                                height: 400,
                                width: '50%',
                                py: 3,
                                display: 'flex',
                                m: 'auto'
                            }}
                        >
                            {cameraData && (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </PageLayout>
        </>
    )
}

export default App
