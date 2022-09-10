import React from 'react'
import { styled, Typography } from '@mui/material'

const HighLightBox = styled('div')({
    borderRadius: '8px',
    backgroundColor: '#ECEFF4',
    padding: '26px',
    variants: {
        secondary: {
            backgroundColor: '#fff',
            border: `4px solid #0015C4`,
            borderRadius: 32
        },
        outlined: {
            backgroundColor: '#fff',
            border: '4px solid #ECEFF4'
        },
        white: {
            backgroundColor: '#FFFFFF'
        }
    }
})

export function HighLightBoxHeader(props) {
    const { children } = props

    return (
        <HighLightBox
            style={{
                padding: 4,
                paddingLeft: 24
            }}
        >
            <Typography sx={{ padding: '10px' }} variant="h4">
                {children}
            </Typography>
        </HighLightBox>
    )
}

export function HighLightBoxContent(props) {
    const { children, variant, style } = props

    return (
        <HighLightBox variant={variant} style={style}>
            {children}
        </HighLightBox>
    )
}