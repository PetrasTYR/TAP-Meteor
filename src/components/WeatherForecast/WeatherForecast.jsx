import React from 'react'
import { Box, Typography } from '@mui/material'

const WeatherForecast = ({ selectedCamera }) => {
    const area = selectedCamera.area
    const forecast = selectedCamera.forecast
    return (
        <>
            <Box>
                <Typography>Area: {area}</Typography>
                <Typography>Forecast: {forecast}</Typography>
            </Box>
        </>
    )
}

export default WeatherForecast
