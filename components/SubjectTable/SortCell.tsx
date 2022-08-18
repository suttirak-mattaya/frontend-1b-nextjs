import { Box, TableCell, Typography } from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'

type SortableCellProps = {
  id: 'id' | 'name' | 'section'
  width: string
  name: string
  isReverse: boolean
  sortTitle: string[]
  onClick: () => void
}

export default function SortCell(props: SortableCellProps) {
  return (
    <TableCell
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        bgcolor: '#000000',
        color: '#ffffff',
        width: props.width,
      }}
      onClick={props.onClick}
    >
      <Box display='flex' alignItems='center' justifyContent='center'>
        {props.isReverse
          ? props.sortTitle[0] === props.id && <ArrowUpward className='icon' />
          : props.sortTitle[0] === props.id && (
              <ArrowDownward className='icon' />
            )}
        <Box flexGrow={1} />
        <Typography>{props.name}</Typography>
        <Box flexGrow={1} />
        {props.isReverse
          ? props.sortTitle[0] === props.id && <ArrowUpward className='icon' />
          : props.sortTitle[0] === props.id && (
              <ArrowDownward className='icon' />
            )}
      </Box>
    </TableCell>
  )
}
