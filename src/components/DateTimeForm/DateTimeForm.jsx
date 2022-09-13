import React from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { Box, TextField, Button, Stack, Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const DateTimeForm = ({
    selectedDate,
    selectedTime,
    handleDateChange,
    handleTimeChange,
    handleView
}) => {
    dayjs().format()
    return (
        <>
            <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <DesktopDatePicker
                                        label='Date'
                                        inputFormat='YYYY-MM-DD'
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <TimePicker
                                        label='Time'
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </LocalizationProvider>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                >
                    <Button
                        variant='outlined'
                        onClick={handleView}
                        sx={{
                            width: '55%'
                        }}
                    >
                        Retrieve
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default DateTimeForm
