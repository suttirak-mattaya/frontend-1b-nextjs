import React from 'react'
import ListTable from '../../components/TeacherListTable'
import MenuAppBar from '../../components/MenuAppBar'
import ProviderApollo from '../../components/ProviderApollo'
import { Box } from '@mui/material'

function TeacherPage() {
  return (
    <>
      <MenuAppBar />
      <Box width='88%' mt='16px' mx='6%'>
        <ListTable />
      </Box>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #edebe9;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}

export default function () {
  return (
    <ProviderApollo>
      <TeacherPage />
    </ProviderApollo>
  )
}
