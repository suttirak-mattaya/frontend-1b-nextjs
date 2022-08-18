import { gql, useQuery } from '@apollo/client'
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SearchFilter from './SearchFilter'
import TableHeader from './TableHeader'

type StringKey = {
  [key: string]: any
}

type StudentData = StringKey & {
  std_id: string
  name: string
  profile_picture: { id: string }
  faculty: string
  sub_faculty: string
  degree: string
}

function sortTable(arr: StudentData[], titles: string[], reverse: boolean) {
  let tmp = arr.slice(0)

  // sorting with title
  for (let i = titles.length - 1; i >= 0; i--) {
    let title = titles[i]
    tmp.sort(function (a: StudentData, b: StudentData) {
      let rv = reverse ? -1 : 1
      if (title == 'sub_faculty') {
        let aa = a.faculty + '|' + a.sub_faculty
        let bb = b.faculty + '|' + b.sub_faculty
        return rv * aa.localeCompare(bb)
      }
      return rv * a[title].localeCompare(b[title])
    })
  }
  return tmp
}

function filterInput(arr: StudentData[], val: string | null) {
  if (val === '' || !val) {
    return arr.slice(0)
  }

  let tmp = arr.filter((element) => {
    if (element.std_id.toLowerCase().search(val.toLowerCase()) >= 0) return true
    if (element.name.toLowerCase().search(val.toLowerCase()) >= 0) return true
    if (element.faculty.toLowerCase().search(val.toLowerCase()) >= 0)
      return true
    if (element.sub_faculty.toLowerCase().search(val.toLowerCase()) >= 0)
      return true
    if (element.degree.toLowerCase().search(val.toLowerCase()) >= 0) return true
    return false
  })
  return tmp
}

const GET_STUDENTS = gql`
  query {
    student {
      std_id
      name
      profile_picture {
        id
      }
      faculty
      sub_faculty
      degree
    }
  }
`

export default function ListTable() {
  const [origData, setOrigData] = useState<StudentData[]>([])
  const [isReverse, setReverse] = useState(false)
  const [sortTitle, setSortTitle] = useState([
    'std_id',
    'name',
    'sub_faculty',
    'degree',
  ])
  const [data, setData] = useState<StudentData[]>([])

  const doSortTable = (isReverse: boolean, sortTitle: string[]) => {
    setReverse(isReverse)
    setSortTitle(sortTitle)
    console.log(sortTitle)
    setData(sortTable(origData, sortTitle, isReverse))
  }

  const doFilterWord = (word: string) => {
    let dats = filterInput(origData, word)
    setData(sortTable(dats, sortTitle, isReverse))
  }

  const { loading, error } = useQuery(GET_STUDENTS, {
    onCompleted: (data) => {
      setOrigData(data.student)
      setData(sortTable(data.student, sortTitle, isReverse))
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', top: 0 }}>
      <SearchFilter activationHandler={doFilterWord} />
      <TableContainer sx={{ maxHeight: 'calc(100vh - 126px)' }}>
        <Table stickyHeader>
          <TableHeader activationHandler={doSortTable} />
          <TableBody>
            {data.map((row, index) => (
              <Link
                href={{
                  pathname: '/student/[id]',
                  query: { id: row.std_id },
                }}
              >
                <TableRow
                  key={index}
                  sx={{
                    userSelect: 'none',
                    cursor: 'pointer',
                    bgcolor: index % 2 == 0 ? '#ffffff' : '#efefef',
                  }}
                >
                  <TableCell align='center'>
                    <Typography>{row.std_id}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Box
                      display='flex'
                      justifyContent='flex-start'
                      alignItems='center'
                      px={2}
                    >
                      <Avatar
                        alt=''
                        src={
                          row.profile_picture && row.profile_picture.id != ''
                            ? `http://localhost:8055/assets/${row.profile_picture.id}`
                            : ''
                        }
                      ></Avatar>
                      <Typography ml={2}>{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{row.faculty}</Typography>
                    <Typography>{row.sub_faculty}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>{row.degree}</Typography>
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
