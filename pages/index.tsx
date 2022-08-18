import HomeIcon from '@mui/icons-material/Home'
import { Typography, Box } from '@mui/material'
import Link from 'next/link'
import MenuAppBar from '../components/MenuAppBar'

export default function Home() {
  return (
    <>
      <MenuAppBar />
      <Box width='100vw' height='calc(100vh - 112px)' color='white'>
        <Box
          width='70%'
          mx='15%'
          height='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <Typography variant='h2' fontWeight='bold'>
            Welcome, visitor
          </Typography>
          <Typography mt={3}>
            เว็บไซต์นี้เป็นส่วนหนึ่งของรายวิชา 240-420 ในงาน Assignment 1b: SSG
            tool for web site generator
            <br />
            โดยเว็บไซต์นี้จะเรียกข้อมูลจาก Directus9 ใน{' '}
            <a href='http://localhost:8055'>http://localhost:8055</a>
          </Typography>
        </Box>
      </Box>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-image: url('/bg.png');
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}
