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

type TeacherData = StringKey & {
  name: string
  profile_picture: { id: string }
  faculty: string
  sub_faculty: string
}

function sortTable(arr: TeacherData[], titles: string[], reverse: boolean) {
  let tmp = arr.slice(0)

  // sorting with title
  for (let i = titles.length - 1; i >= 0; i--) {
    let title = titles[i]
    tmp.sort(function (a: TeacherData, b: TeacherData) {
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

function filterInput(arr: TeacherData[], val: string | null) {
  if (val === '' || !val) {
    return arr.slice(0)
  }

  let tmp = arr.filter((element) => {
    if (element.name.toLowerCase().search(val.toLowerCase()) >= 0) return true
    if (element.faculty.toLowerCase().search(val.toLowerCase()) >= 0)
      return true
    if (element.sub_faculty.toLowerCase().search(val.toLowerCase()) >= 0)
      return true
    return false
  })
  return tmp
}

const GET_TEACHERS = gql`
  query {
    teacher {
      id
      name
      profile_picture {
        id
      }
      faculty
      sub_faculty
    }
  }
`

export default function ListTable() {
  const [origData, setOrigData] = useState<TeacherData[]>([])
  const [isReverse, setReverse] = useState(false)
  const [sortTitle, setSortTitle] = useState(['name', 'sub_faculty'])
  const [data, setData] = useState<TeacherData[]>([])

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

  const { loading, error } = useQuery(GET_TEACHERS, {
    onCompleted: (data) => {
      setOrigData(data.teacher)
      setData(sortTable(data.teacher, sortTitle, isReverse))
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
                  pathname: '/teacher/[id]',
                  query: { id: row.id },
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
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
