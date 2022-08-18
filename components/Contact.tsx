import { Call, Mail } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

type IContact = {
  phone_numbers: string[]
  emails: string[]
}

export function Contact(props: IContact = { phone_numbers: [], emails: [] }) {
  return (
    <Box width='100%'>
      {props.phone_numbers.map((phone, index) => (
        <Box
          key={index}
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          py={0.5}
        >
          <Call />
          <Typography ml={1}>{phone}</Typography>
        </Box>
      ))}
      {props.emails.map((mail, index) => (
        <Box
          key={index}
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          py={0.5}
        >
          <Mail />
          <Typography ml={1}>{mail}</Typography>
        </Box>
      ))}
    </Box>
  )
}
