import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'

type FileCardProps = {
  id: string
  filename: string
  onRemove?: () => void
  status?: 'loading' | 'error' | 'success'
  error?: string
  disabled?: boolean
}

function FileCard({
  id,
  filename,
  onRemove,
  status,
  error,
  disabled,
}: FileCardProps) {
  return (
    <Card
      key={id}
      sx={{
        width: '100%',
        mb: 0.5,
        p: 0,
        '& .MuiCardContent-root': {
          py: 0,
          px: 1.5,
        },
        '& .MuiCardContent-root:last-child': {
          py: 0,
          px: 1.5,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">{filename}</Typography>
          {status === 'loading' && <CircularProgress />}
          {status === 'error' && <Typography color="error">{error}</Typography>}
          {status !== 'error' && (
            <IconButton onClick={onRemove} disabled={disabled}>
              <ClearIcon />
            </IconButton>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FileCard
