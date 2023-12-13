import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type Props = {
  countFiles: number
  countFolders: number
  totalSize: string
}

function CountFiles({ countFiles, countFolders, totalSize }: Props) {
  return (
    <Stack p={2}>
      <Typography variant="body2">{`${countFiles} files, ${countFolders} folders. Total size: ${totalSize}`}</Typography>
    </Stack>
  )
}

export default CountFiles
