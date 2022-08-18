import { Schedule, Search } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

type SearchFilterProps = {
  activationHandler: (word: string) => void
}

export default function SearchFilter(props: SearchFilterProps) {
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    props.activationHandler(searchWord)
  }, [searchWord])

  return (
    <Box
      width='100%'
      height='36px'
      display='flex'
      alignItems='center'
      justifyContent='flex-end'
      px={0.2}
    >
      <TextField
        variant='standard'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setSearchWord(event.target.value)}
      />
    </Box>
  )
}
