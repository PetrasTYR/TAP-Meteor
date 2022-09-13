import React, { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI'
import PageLayout from './common/Layout/PageLayout'
import DateTimeForm from './components/DateTimeForm/DateTimeForm'
import TrafficImage from './components/TrafficImage/TrafficImage'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
// import positionStackAPI from './api/positionStackAPI'

function App() {
    const [selectedDate, setSelectedDate] = useState()
    const [selectedTime, setSelectedTime] = useState()

    // States related to traffic images
    const [cameraData, setCameraData] = useState()
    const [selectedCamera, setSelectedCamera] = useState()

    // States related to weather
    const [weatherData, setWeatherData] = useState()

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

    // const reverseGeocodePromise = async (camera) => {
    //     const lat = camera.location.latitude
    //     const lng = camera.location.longitude
    //     return positionStackAPI.reverseGeocodeStreetAddress(lat, lng)
    //     const streetName = await positionStackAPI.reverseGeocodeStreetAddress(
    //         lat,
    //         lng
    //     ).data[0].streetName
    //     console.log(streetName)
    //     camera.streetName = streetName
    //     return camera
    //     cameraData.forEach((camera) => {
    //         const lat = camera.location.latitude
    //         const lng = camera.location.longitude
    //         const streetName = positionStackAPI.reverseGeocodeStreetAddress(
    //             lat,
    //             lng
    //         ).data[0].street
    //         camera.streetName = streetName
    //     })
    //     return cameraData
    // }

    // react-query for traffic image
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
                // Promise.all(
                //     trafficData.items[0].cameras.map(async (camera) => {
                //         return reverseGeocodePromise(camera)
                //     })
                // ).then((results) => {
                //     console.log(results)
                // })
                setCameraData(trafficData.items[0].cameras)
                toast.success('Traffic data fetched successfully.')
            }
        }
    }, [trafficData])

    // react-query for weather data
    const { data: getWeatherData, error: getWeatherDataError } = useQuery(
        ['weatherData', formattedDate],
        async () => {
            const { data } = await govtAPI.getTwoHourWeather(formattedDate)
            return data
        }
    )

    if (getWeatherDataError) {
        toast.error('Error fetching weather data. Please try again later.')
    }

    useEffect(() => {
        if (getWeatherData) {
            setWeatherData(getWeatherData)
        }
    }, [getWeatherData])

    const addForecast = useCallback(
        (camera) => {
            const lat = camera.location.latitude
            const lng = camera.location.longitude
            const areaMetaData = weatherData.area_metadata
            const forecasts = weatherData.items[0].forecasts
            areaMetaData.forEach((area) => {
                if (
                    lat - area.label_location.latitude < 0.00001 &&
                    lng - area.label_location.longitude < 0.00001
                ) {
                    const location = area.name
                    const forecast = forecasts.find(
                        (obj) => obj.area === location
                    ).forecast
                    camera.area = location
                    camera.forecast = forecast
                }
            })
        },
        [weatherData]
    )

    const mapWeatherInfo = useCallback(
        (cameraData) => {
            cameraData?.forEach(async (camera) => {
                addForecast(camera)
            })
        },
        [addForecast]
    )

    useEffect(() => {
        mapWeatherInfo(cameraData)
    }, [cameraData, mapWeatherInfo])

    const rows = cameraData?.map((camera, index) => {
        return {
            id: camera.camera_id,
            index,
            image: camera.image,
            latitude: camera.location.latitude,
            longitude: camera.location.longitude,
            image_metadata: camera.image_metadata,
            area: camera.area,
            forecast: camera.forecast,
            _raw: camera
        }
    })
    const columns = [
        { field: 'id', headerName: 'Camera ID', width: 100 },
        { field: 'latitude', headerName: 'Latitude', width: 150 },
        { field: 'longitude', headerName: 'Longitude', width: 150 },
        { field: 'location', headerName: 'View From', width: 150 }
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
                                width: '100%',
                                pb: 3,
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
                                    onRowClick={(params) => {
                                        setSelectedCamera(params.row)
                                    }}
                                />
                            )}
                        </Box>
                        <Box
                            sx={{
                                height: '50%',
                                width: '60%',
                                display: 'flex',
                                m: 'auto',
                                pb: 1
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
