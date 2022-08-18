import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

type IAccount = {
  profile_url: string
  name: string
  id: string
  type: string
}

function convertToPagesOfAccounts(accounts: IAccount[]) {
  let pages = []
  while (accounts.length > 0) {
    let page = accounts.splice(0, 5)
    pages.push(page)
  }
  return pages
}

export function Account(props: IAccount) {
  return (
    <Link
      href={{
        pathname: '/[type]/[id]',
        query: { type: props.type, id: props.id },
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
        width='100%'
        p='5px'
        sx={{ userSelect: 'none', cursor: 'pointer' }}
      >
        <Avatar
          src={props.profile_url}
          alt=''
          sx={{ width: '40px', height: '40px', position: 'initial' }}
        ></Avatar>
        <Typography ml={1}>{props.name}</Typography>
      </Box>
    </Link>
  )
}

type IAccountList = {
  accounts: IAccount[]
}

export default function AccountList(props: IAccountList = { accounts: [] }) {
  const tempAccounts = React.useRef(props.accounts)
  const [pages, setPages] = React.useState<IAccount[][]>(
    convertToPagesOfAccounts(props.accounts)
  )
  const [pageNumber, setPageNumber] = React.useState<number>(0)

  React.useEffect(() => {
    if (props.accounts != tempAccounts.current) {
      tempAccounts.current = props.accounts
      setPages(convertToPagesOfAccounts(props.accounts))
    }
  })

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableBody>
            {pages.length > 0 &&
              pages[pageNumber].map((account, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Account
                      profile_url={account.profile_url}
                      name={account.name}
                      id={account.id}
                      type={account.type}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <IconButton
          size='small'
          disabled={pageNumber <= 0}
          onClick={() => setPageNumber(0)}
        >
          <FirstPage />
        </IconButton>
        <IconButton
          size='small'
          disabled={pageNumber <= 0}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <NavigateBefore />
        </IconButton>
        <Typography sx={{ userSelect: 'none' }} mx={1}>
          Page {pageNumber + 1} of {pages.length}
        </Typography>
        <IconButton
          size='small'
          disabled={pageNumber >= pages.length - 1}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <NavigateNext />
        </IconButton>
        <IconButton
          size='small'
          disabled={pageNumber >= pages.length - 1}
          onClick={() => setPageNumber(pages.length - 1)}
        >
          <LastPage />
        </IconButton>
      </Box>
    </Box>
  )
}
