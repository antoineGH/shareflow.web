import { useEffect } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'
import { fetchFiles } from 'store/files/actions'
import {
  filesDataStateSelector,
  filesStateSelector,
} from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import { FileData } from 'types/files'

import TagsSeachField from './tagsSearchField/TagsSearchField'
import FilesTable from '../files/filesTable/FilesTable'

function Tags() {
  const dispatch = useDispatch()

  // ### User ###
  const user = useSelector(selectUserSelector)
  const { userId, error } = useFetchUserFromToken(user)
  const {
    isLoadingFetch: isLoadingFetchUser,
    hasErrorFetch: hasErrorFetchUser,
  } = useSelector(userStateSelector)

  useEffect(() => {
    if (!userId || user) return
    dispatch(fetchUser({ userId }))
  }, [userId, user])

  // ### Files ###
  const fileData: FileData = useSelector(filesDataStateSelector)
  const {
    isLoadingFetch: isLoadingFetchFiles,
    hasErrorFetch: hasErrorFetchFiles,
  } = useSelector(filesStateSelector)

  useEffect(() => {
    if (!userId) return
    dispatch(fetchFiles({ userId }))
  }, [userId])

  // ### Error ###
  const isLoading = isLoadingFetchUser || isLoadingFetchFiles
  const hasError = hasErrorFetchUser || hasErrorFetchFiles || error

  useEffect(() => {
    if (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: 'error',
          message: error?.message || 'Error, please try again',
        }),
      )
    }
  }, [dispatch, error])

  if (isLoading) return <>Loading</>
  if (hasError || !userId || !fileData) return <>Error</>

  const { files } = fileData

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
