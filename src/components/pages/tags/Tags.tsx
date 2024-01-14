import { useEffect, useMemo, useState } from 'react'

import { Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import ErrorFiles from 'components/common/ErrorFiles'
import LoadingFiles from 'components/common/LoadingFiles'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'
import { fetchFiles } from 'store/files/actions'
import {
  filesDataStateSelector,
  filesStateSelector,
} from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { selectedTagsSelector } from 'store/tags/selector'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import { FileData } from 'types/files'

import TagsSeachField from './tagsSearchField/TagsSearchField'
import { getSelectedTagsName } from './utils'
import FilesTable from '../files/filesTable/FilesTable'
import FilePreview from '../files/previewModal/FilePreview'
import PreviewModal from '../files/previewModal/PreviewModal'

function Tags() {
  const [hasStartedFetching, setHasStartedFetching] = useState(false)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [previewFileId, setPreviewFileId] = useState<number | null>(null)
  const dispatch = useDispatch()

  // ### User ###
  const user = useSelector(selectUserSelector)
  const { userId, error } = useFetchUserFromToken(user)
  const {
    isLoadingFetch: isLoadingFetchUser,
    hasErrorFetch: hasErrorFetchUser,
  } = useSelector(userStateSelector)

  const selectedTags = useSelector(selectedTagsSelector)

  const selectedTagsName = useMemo(
    () => getSelectedTagsName(selectedTags),
    [selectedTags],
  )

  const [previousSelectedTagsName, setPreviousSelectedTagsName] =
    useState(selectedTagsName)

  useEffect(() => {
    if (!userId) return
    if (!user) dispatch(fetchUser({ userId }))
    setHasStartedFetching(true)
    dispatch(fetchFiles({ userId, filter: 'all_files' }))
  }, [userId, user])

  // ### Files ###
  const fileData: FileData = useSelector(filesDataStateSelector)
  const {
    isLoadingFetch: isLoadingFetchFiles,
    hasErrorFetch: hasErrorFetchFiles,
  } = useSelector(filesStateSelector)

  //  On selected tags change fetch files
  useEffect(() => {
    if (!userId) return

    // Compare previously selectedTagsName with current selectedTagsName
    if (
      Array.isArray(selectedTagsName) &&
      Array.isArray(previousSelectedTagsName) &&
      selectedTagsName.length === previousSelectedTagsName.length &&
      selectedTagsName.every(value => previousSelectedTagsName.includes(value))
    ) {
      return
    }

    dispatch(
      fetchFiles({
        userId: userId,
        filter: 'all_files',
        tags: selectedTagsName,
      }),
    )
    setPreviousSelectedTagsName(selectedTagsName)
  }, [userId, selectedTagsName])

  // ### Error ###
  const isLoading = isLoadingFetchUser || isLoadingFetchFiles
  const hasError = hasErrorFetchUser || hasErrorFetchFiles || error

  useEffect(() => {
    if (!isLoading) return
    setHasStartedFetching(true)
  }, [isLoading])

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

  const setPreviewUrlCallback = (url: string, fileId: number) => {
    setPreviewFile(url)
    setPreviewFileId(fileId)
  }

  const closePreviewModal = () => {
    setPreviewFile(null)
    setPreviewFileId(null)
  }

  const { files } = fileData

  if (isLoading || !userId || !hasStartedFetching)
    return <LoadingFiles pageName="Tags" />

  if (hasError) return <ErrorFiles pageName="Tags" />

  if (!isLoading && !hasError)
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
          {files.length > 0 ? (
            <FilesTable
              userId={userId}
              files={files}
              isPageTag={true}
              handleChangeDrawerTab={() => {}}
              handleDrawerOpen={() => {}}
              toggleDrawer={() => {}}
              setPreviewUrlCallback={setPreviewUrlCallback}
            />
          ) : (
            <Typography sx={{ fontSize: '.85rem', px: 2, ml: 1 }}>
              No files found
            </Typography>
          )}
        </Grid>
        <PreviewModal
          userId={userId}
          open={!!previewFile}
          close={closePreviewModal}
          previewFileId={previewFileId || 0}
        >
          <FilePreview
            previewFileUrl={previewFile || ''}
            previewFileId={previewFileId || 0}
          />
        </PreviewModal>
      </Grid>
    )
}

export default Tags
