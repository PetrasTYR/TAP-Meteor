import React from 'react'
import { Box } from '@mui/material'

const TrafficImage = ({ selectedCamera }) => {
    const { image_metadata, image } = selectedCamera
    return (
        <>
            <Box
                component='img'
                sx={{
                    height: image_metadata.height,
                    width: image_metadata.width
                }}
                alt='Traffic Image'
                src={image}
            />
        </>
    )
}

export default TrafficImage
