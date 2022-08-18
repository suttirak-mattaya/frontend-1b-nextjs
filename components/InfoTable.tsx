import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
} from '@mui/material'
import React from 'react'

type AccountInfo = {
  topic: string
  info: string
}

type InfoContent = {
  content: AccountInfo[]
}

export default function InfoTable(props: InfoContent = { content: [] }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: '200px' }}>
        <TableBody>
          {props.content.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.topic}</TableCell>
              <TableCell align='right'>{row.info}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
