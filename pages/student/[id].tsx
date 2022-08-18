import { gql, useQuery } from '@apollo/client'
import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { Account } from '../../components/AccountList'
import { Contact } from '../../components/Contact'
import InfoTable from '../../components/InfoTable'
import MenuAppBar from '../../components/MenuAppBar'
import SubjectTable from '../../components/SubjectTable'
import { useRouter } from 'next/router'
import ProviderApollo from '../../components/ProviderApollo'

function Choice(props: {
  condition: boolean
  value: string
  onClick: React.MouseEventHandler<HTMLDivElement>
}) {
  return (
    <Box
      flexGrow={1}
      ml={1}
      height='80%'
      borderRadius='18px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={
        props.condition
          ? { bgcolor: 'black', color: 'white' }
          : { cursor: 'pointer' }
      }
      onClick={props.onClick}
    >
      <Typography>{props.value}</Typography>
    </Box>
  )
}

const defaultStudentData = {
  std_id: 'id',
  name: 'name',
  profile_picture: {
    id: '',
  },
  faculty: 'faculty',
  sub_faculty: 'sub_faculty',
  degree: 'y1',
  email: '',
  phone_number: '',
  advisor: {
    id: '',
    profile_picture: {
      id: '',
    },
    name: 'advisor',
  },
  subjects: [],
}

const GET_STUDENT_DATA = (std_id: string | string[]) => {
  return gql`
    query {
    student(filter: {std_id:{_eq:"${std_id}"}}) {
      std_id,
      name,
      profile_picture {
        id
      }
      faculty,
      sub_faculty,
      degree,
      email,
      phone_number
      advisor {
        id
        profile_picture {
          id
        }
        name
      },
      subjects {
        subject_id {
          subject_id,
          section,
          subject_name,
          study_times {
            study_time_id {
              day,
              start_hour,
              end_hour
            }
          }
        }
      }
    }
  }
  `
}

function StudentInfo() {
  const [tab, setTab] = React.useState('profile')
  const id = useRouter().query.id
  const [data, setData] = React.useState(defaultStudentData)

  const { loading, error } = useQuery(GET_STUDENT_DATA(id ? id : ''), {
    onCompleted: (data) => {
      console.log(data)
      setData({ ...data.student[0] })
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <MenuAppBar />
      <Box
        width='88%'
        mx='6%'
        height='144px'
        position='fixed'
        bgcolor='#edebe9'
      >
        <Box
          width='100%'
          height='70%'
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          p='16px'
        >
          <Avatar
            src={
              data.profile_picture && data.profile_picture.id != ''
                ? `http://localhost:8055/assets/${data.profile_picture.id}`
                : ''
            }
            alt=''
            sx={{ width: '58px', height: '58px' }}
          ></Avatar>
          <Box ml={2}>
            <Typography>{data.name}</Typography>
            <Typography>{data.degree}</Typography>
          </Box>
        </Box>
        <Box
          width='100%'
          height='30%'
          borderTop='2px solid gray'
          borderBottom='2px solid gray'
          textAlign='center'
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{ userSelect: 'none' }}
        >
          <Choice
            condition={tab === 'profile'}
            value={'ข้อมูลทั่วไป'}
            onClick={() => setTab('profile')}
          />
          <Choice
            condition={tab === 'subject'}
            value={'วิชาที่ลงทะเบียน'}
            onClick={() => setTab('subject')}
          />
        </Box>
      </Box>
      <Box width='88%' mx='6%' height='144px' />
      {/* ข้อมูลทั่วไป */}
      {tab === 'profile' && (
        <Box
          width='88%'
          mx='6%'
          mt='12px'
          display='flex'
          alignItems='flex-start'
          justifyContent='center'
        >
          <Box
            width='calc(65% - 6px)'
            mr='6px'
            bgcolor='white'
            borderRadius='6px'
            p='16px'
          >
            <Box width='100%'>
              <Typography variant='h5'>ข้อมูลทั่วไป</Typography>
              <InfoTable
                content={[
                  { topic: 'รหัสนักศึกษา', info: data.std_id },
                  { topic: 'ชื่อ-นามสกุล', info: data.name },
                  { topic: 'คณะ', info: data.faculty },
                  { topic: 'ภาควิชา', info: data.sub_faculty },
                ]}
              />
            </Box>
            {data.advisor && (
              <Box width='100%' mt={2}>
                <Typography variant='h5'>อาจารย์ที่ปรึกษา</Typography>
                <Account
                  profile_url={
                    data.advisor.profile_picture &&
                    data.advisor.profile_picture.id != ''
                      ? `http://localhost:8055/assets/${data.advisor.profile_picture.id}`
                      : ''
                  }
                  name={data.advisor.name}
                  id={data.advisor.id}
                  type='teacher'
                />
              </Box>
            )}
          </Box>
          <Box
            width='calc(35% - 6px)'
            ml='6px'
            bgcolor='white'
            borderRadius='6px'
            p='16px'
          >
            <Typography variant='h5'>ติดต่อ</Typography>
            <Contact
              phone_numbers={
                data.phone_number && data.phone_number != ''
                  ? [data.phone_number]
                  : []
              }
              emails={
                data.email != '' && data.email
                  ? [
                      `${data.std_id}@psu.ac.th`,
                      `${data.std_id}@email.psu.ac.th`,
                      data.email,
                    ]
                  : [
                      `${data.std_id}@psu.ac.th`,
                      `${data.std_id}@email.psu.ac.th`,
                    ]
              }
            />
          </Box>
        </Box>
      )}
      {/* วิชาที่ลงทะเบียน */}
      {tab === 'subject' && (
        <Box width='88%' mx='6%' mt='12px' position='relative'>
          <SubjectTable subjectData={data.subjects} />
        </Box>
      )}
      {/* Styling */}
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
      <StudentInfo />
    </ProviderApollo>
  )
}
