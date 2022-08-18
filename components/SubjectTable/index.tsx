import {
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import SearchFilter from './SearchFilter'
import TableHeader from './TableHeader'

type TimeSchedule = {
  day: string
  start: number
  end: number
}

type StringKey = {
  [key: string]: any
}

type SubjectData = StringKey & {
  id: string
  name: string
  section: string
  times: TimeSchedule[]
}

const day_of_week: StringKey = {
  Monday: 'จ.',
  Tuesday: 'อ.',
  Wednesday: 'พ.',
  Thursday: 'พฤ.',
  Friday: 'ศ.',
  Saturday: 'ส.',
  Sunday: 'อา.',
}

function getTimeString(times: TimeSchedule[]): string[] {
  let str_times: string[] = []
  times.forEach((time) => {
    let str_time = `${day_of_week[time.day]} ${time.start}:00-${time.end}:00 น.`
    str_times.push(str_time)
  })
  return str_times
}

function sortTable(arr: SubjectData[], titles: string[], reverse: boolean) {
  let tmp = arr.slice(0)
  // sorting with title
  for (let i = titles.length - 1; i >= 0; i--) {
    let title = titles[i]
    tmp.sort(function (a: SubjectData, b: SubjectData) {
      let rv = reverse ? -1 : 1
      return rv * a[title].localeCompare(b[title])
    })
  }
  return tmp
}

function filterInput(arr: SubjectData[], val: string | null) {
  if (val === '' || !val) {
    return arr.slice(0)
  }

  let tmp = arr.filter((element) => {
    if (element.id.toLowerCase().search(val.toLowerCase()) >= 0) return true
    if (element.name.toLowerCase().search(val.toLowerCase()) >= 0) return true
    if (element.section.search(val) >= 0) return true
    return false
  })
  return tmp
}

type SubjectDataProps = {
  subject_id: {
    subject_id: string
    subject_name: string
    section: number
    study_times: {
      study_time_id: {
        day: string
        start_hour: number
        end_hour: number
      }
    }[]
  }
}

function formatData(subjectData: SubjectDataProps[]): SubjectData[] {
  let datas: SubjectData[] = []
  subjectData.forEach(({ subject_id }) => {
    let data: SubjectData = {
      id: subject_id.subject_id,
      name: subject_id.subject_name,
      section: `${subject_id.section < 10 ? '0' : ''}` + subject_id.section,
      times: [],
    }
    subject_id.study_times.forEach(({ study_time_id }) => {
      let time = {
        day: study_time_id.day,
        start: study_time_id.start_hour,
        end: study_time_id.end_hour,
      }
      data.times.push(time)
    })
    datas.push(data)
  })
  return datas
}

export default function SubjectTable(props: {
  subjectData: SubjectDataProps[]
}) {
  const origData = formatData(props.subjectData)
  const [isReverse, setReverse] = useState(false)
  const [sortTitle, setSortTitle] = useState(['id', 'name', 'section'])
  const [data, setData] = useState(
    sortTable(origData, ['id', 'name', 'section'], false)
  )

  const doSortTable = (isReverse: boolean, sortTitle: string[]) => {
    setReverse(isReverse)
    setSortTitle(sortTitle)
    setData(sortTable(origData, sortTitle, isReverse))
  }

  const doFilterWord = (word: string) => {
    let dats = filterInput(origData, word)
    setData(sortTable(dats, sortTitle, isReverse))
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', top: 0 }}>
        <SearchFilter activationHandler={doFilterWord} />
        <TableContainer sx={{ maxHeight: 'calc(100vh - 276px)' }}>
          <Table stickyHeader>
            <TableHeader activationHandler={doSortTable} />
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ bgcolor: index % 2 == 0 ? '#ffffff' : '#efefef' }}
                  >
                    <TableCell align='center'>{row.id}</TableCell>
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.section}</TableCell>
                    <TableCell align='center'>
                      {getTimeString(row.times).map((time, index) => (
                        <Typography key={index}>{time}</Typography>
                      ))}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}
