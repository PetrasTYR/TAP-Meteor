import React from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { Box, TextField, Button } from '@mui/material'
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}
            >
                <DesktopDatePicker
                    label='Date desktop'
                    inputFormat='YYYY-MM-DD'
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    label='Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button
                    variant='outlined'
                    onClick={handleView}
                    sx={{
                        width: '60%'
                    }}
                >
                    View
                </Button>
            </Box>
        </LocalizationProvider>
    )
}

export default DateTimeForm
