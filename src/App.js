import React, { useEffect, useState } from 'react'
// import './App.css'
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI'
import PageLayout from './common/Layout/PageLayout'
import DateTimeForm from './components/DateTimeForm/DateTimeForm'
import TrafficImage from './components/TrafficImage/TrafficImage'
import { Box, Button } from '@mui/material'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'

function App() {
    const [selectedDate, setSelectedDate] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [cameraData, setCameraData] = useState()
    const [selectedCamera, setSelectedCamera] = useState()

    const defaultDate = new Date()

    const [formattedDate, setFormattedDate] = useState(
        dayjs(defaultDate).format('YYYY-MM-DDTHH:mm:ss')
    )

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time)
    }

    const handleView = () => {
        setSelectedCamera()
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
            if (Object.keys(trafficData.items[0]).length === 0) {
                setCameraData(null)
                toast.error('No traffic data available for this date and time.')
            } else if (trafficData.items[0].cameras.length > 0) {
                setCameraData(trafficData.items[0].cameras)
                toast.success('Traffic data fetched successfully.', {
                    position: 'bottom-center',
                    autoClose: 3000,
                    hideProgressBar: false
                })
            }
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
                return (
                    <Button onClick={() => setSelectedCamera(camera)}>
                        View Image
                    </Button>
                )
            }
        }
    ]
    console.log(selectedCamera)
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
                        <Box
                            sx={{
                                height: 400,
                                width: '50%',
                                display: 'flex',
                                m: 'auto'
                            }}
                        >
                            {selectedCamera && (
                                <TrafficImage selectedCamera={selectedCamera} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </PageLayout>
        </>
    )
}

export default App
