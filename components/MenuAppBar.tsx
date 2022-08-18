import { AppBar, Toolbar, Box, Typography } from '@mui/material'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import React from 'react'

export default function MenuAppBar() {
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar sx={{ height: '48px' }}>
          <Link href={'/'}>
            <Box
              color='inherit'
              p={1}
              display='flex'
              justifyContent='center'
              alignItems='center'
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <HomeIcon />
              <Typography ml={1}>Home</Typography>
            </Box>
          </Link>
          <Box sx={{ userSelect: 'none', mx: 1 }}>|</Box>
          <Link href={'/student'}>
            <Box
              color='inherit'
              p={1}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <Typography>Student</Typography>
            </Box>
          </Link>
          <Box sx={{ userSelect: 'none', mx: 1 }}>|</Box>
          <Link href={'/teacher'}>
            <Box
              color='inherit'
              p={1}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <Typography>Teacher</Typography>
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: '48px' }} />
    </>
  )
}
