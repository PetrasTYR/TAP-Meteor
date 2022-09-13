import React from 'react'
import { Box } from '@mui/material'

const TrafficImage = ({ selectedCamera }) => {
    const { image } = selectedCamera
    return (
        <>
            <Box
                component='img'
                sx={{
                    height: 'auto',
                    width: '100%'
                }}
                alt='Traffic Image'
                src={image}
            />
        </>
    )
}

export default TrafficImage
