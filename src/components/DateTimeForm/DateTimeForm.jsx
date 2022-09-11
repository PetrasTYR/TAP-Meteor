import React from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { Box, TextField, Button, Stack } from '@mui/material'
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
                        <Box>
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
                        <Box
                            sx={{
                                pl: 2
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
                    </Box>
                </LocalizationProvider>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
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
