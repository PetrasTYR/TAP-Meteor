import React from 'react'
import { Box, Grid } from '@mui/material'
import { HighLightBoxHeader } from '../ui/highlightBox'

const PageLayout = ({ header, children }) => {
    return (
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
    )
}

export default PageLayout;