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
  const [sortTitle, setSortTitle] = useState([
    'std_id',
    'name',
    'sub_faculty',
    'degree',
  ])

  useEffect(() => {
    props.activationHandler(isReverse, sortTitle)
  }, [isReverse, sortTitle])

  function handleClick(type: 'std_id' | 'name' | 'sub_faculty' | 'degree') {
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
          id='std_id'
          name='รหัสน.ศ.'
          width='15%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('std_id')
          }}
        />
        <SortCell
          id='name'
          name='ชื่อนักศึกษา'
          width='50%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('name')
          }}
        />
        <SortCell
          id='sub_faculty'
          name='คณะ'
          width='20%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('sub_faculty')
          }}
        />
        <SortCell
          id='degree'
          name='ชั้นปี'
          width='15%'
          isReverse={isReverse}
          sortTitle={sortTitle}
          onClick={() => {
            handleClick('degree')
          }}
        />
      </TableRow>
    </TableHead>
  )
}
