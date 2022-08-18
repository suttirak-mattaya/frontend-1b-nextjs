import { TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import SortCell from './SortCell'

type TableSortStatus = {
  activationHandler: (isReverse: boolean, sortTitle: string[]) => void
}

function removeAll(arr: any[], val: any) {
  let i = 0
  let tmp = arr.slice(0)
  while (i < tmp.length) {
    if (tmp[i] == val) {
      tmp.splice(i, 1)
    } else {
      i += 1
    }
  }
  return tmp
}

export default function TableHeader(props: TableSortStatus) {
  const [isReverse, setReverse] = useState(false)
  const [sortTitle, setSortTitle] = useState(['id', 'name', 'section'])

  useEffect(() => {
    props.activationHandler(isReverse, sortTitle)
  }, [isReverse, sortTitle])

  function handleClick(type: 'id' | 'name' | 'section') {
    if (sortTitle[0] === type) {
      setReverse(!isReverse)
    } else {
      setReverse(false)
      let arr = removeAll(sortTitle, type)
      arr.unshift(type)
      setSortTitle(arr)
    }
  }

  return (
    <TableHead>
      <TableRow>
        <SortCell
          id='id'
          name='รหัสวิชา'
          width='15%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('id')
          }}
        />
        <SortCell
          id='name'
          name='ชื่อวิชา'
          width='55%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('name')
          }}
        />
        <SortCell
          id='section'
          name='Section'
          width='15%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('section')
          }}
        />
        <TableCell
          align='center'
          sx={{ width: '15%', bgcolor: '#000000', color: '#ffffff' }}
        >
          <Typography>เวลา</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
