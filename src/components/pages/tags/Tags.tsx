import { useEffect } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'
import { useDispatch, useSelector } from 'store/hooks'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import { FileData } from 'types/files'

import TagsSeachField from './tagsSearchField/TagsSearchField'
import FilesTable from '../files/filesTable/FilesTable'

function Tags() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)
  const { userId, error } = useFetchUserFromToken(user)

  useEffect(() => {
    if (error || !userId || user) return
    dispatch(fetchUser({ userId }))
  }, [userId])

  if (isLoadingFetch) return <>Loading</>
  if (hasErrorFetch || !userId) return <>Error</>

  const filesData: FileData = {
    files: [],
    countFiles: 4,
    countFolders: 4,
    totalSize: '1.17 MB',
  }

  const { files } = filesData

  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
      }}
      gap={1.5}
    >
      <Grid item pt={1.5} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName="Tags" />
        </Breadcrumbs>
      </Grid>
      <Grid item sx={{ width: '100%' }} py={0} px={2}>
        <TagsSeachField userId={userId} />
      </Grid>
      <Grid item sx={{ width: '100%' }} py={0}>
        <FilesTable
          files={files}
          isPageTag={true}
          handleChangeDrawerTab={() => {}}
          handleDrawerOpen={() => {}}
          toggleDrawer={() => {}}
        />
      </Grid>
    </Grid>
  )
}

export default Tags
