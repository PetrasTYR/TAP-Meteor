import React from 'react'
import { Box, Grid } from '@mui/material'
import { HighLightBoxHeader } from '../ui/highlightBox'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PageLayout = ({ header, children }) => {
    return (
        <>
            <Grid
                container
                direction='column'
                justifyContent='flex-start'
                alignItems='stretch'
                spacing={2}
            >
                <Grid item>
                    <HighLightBoxHeader>{header}</HighLightBoxHeader>
                </Grid>
                <Grid item>
                    <Box>{children}</Box>
                </Grid>
            </Grid>
            <ToastContainer position='bottom-center' autoClose={2000} />
        </>
    )
}

export default PageLayout
