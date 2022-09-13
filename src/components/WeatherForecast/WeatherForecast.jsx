import React from 'react'
import { Box, Typography } from '@mui/material'

const WeatherForecast = ({ selectedCamera }) => {
    const area = selectedCamera.area
    const forecast = selectedCamera.forecast
    return (
        <>
            <Box
                sx={{
                    pb: 0,
                    textAlign: 'center'
                }}
            >
                <Typography>Area: {area}</Typography>
                <Typography>Forecast: {forecast}</Typography>
            </Box>
        </>
    )
}

export default WeatherForecast
