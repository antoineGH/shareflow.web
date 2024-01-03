import { useDispatch, useSelector } from 'store/hooks'
import { useEffect } from 'react'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import TagsSeachField from './tagsSearchField/TagsSearchField'
import { FileData } from 'types/files'
import FilesTable from '../files/filesTable/FilesTable'
import { selectAllTagsSelector } from 'store/tags/selector'
import { fetchTags } from 'store/tags/actions'

function Tags() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)
  const tags = useSelector(selectAllTagsSelector)

  useEffect(() => {
    if (!user) {
      // TODO: update userId here from JWT
      dispatch(fetchUser({ userId: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tags.length === 0) {
      // TODO: update userId here from JWT
      dispatch(fetchTags({ userId: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoadingFetch) return <>Loading</>
  if (hasErrorFetch || !user) return <>Error</>

  const filesData: FileData = {
    files: [
      {
        id: 18,
        name: 'Documents',
        size: '305 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Documents',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 2,
        name: 'Photos',
        size: '452 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Photos',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 3,
        name: 'Images',
        size: '262 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Images',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 4,
        name: 'Download',
        size: '159 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Download',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
    ],
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
        <TagsSeachField userId={user.id} />
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
