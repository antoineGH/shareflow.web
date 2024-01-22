import type { SyntheticEvent } from 'react'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabsMUI from '@mui/material/Tabs'

import StyledTypographyTab from './StyledTypographyTab'
import Activities from '../Activity/Activities'
import Comments from '../Comments/Comments'
import Tags from '../Tags/Tags'

type Props = {
  userId: number
  fileId: number
  activeDrawerTab: number
  handleChangeDrawerTab: (tab: number) => void
}

function Tabs({
  userId,
  fileId,
  activeDrawerTab,
  handleChangeDrawerTab,
}: Props) {
  const theme = useTheme()

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    handleChangeDrawerTab(newValue)
  }

  type ListTab = {
    id: string
    label: string
  }

  const listTabs: ListTab[] = [
    {
      id: 'activity',
      label: 'Activity',
    },
    {
      id: 'comments',
      label: 'Comments',
    },
    {
      id: 'tags',
      label: 'Tags',
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <TabsMUI
        centered
        value={activeDrawerTab}
        onChange={handleChange}
        aria-label="tabs-area"
      >
        {listTabs.map(({ id, label }) => (
          <Tab
            key={id}
            label={
              <StyledTypographyTab
                variant="body2"
                color={theme.palette.secondary.contrastText}
                sx={{ fontWeight: 600 }}
              >
                {label}
              </StyledTypographyTab>
            }
          />
        ))}
      </TabsMUI>
      {activeDrawerTab === 0 && <Activities fileId={fileId} />}
      {activeDrawerTab === 1 && <Comments fileId={fileId} />}
      {activeDrawerTab === 2 && <Tags userId={userId} fileId={fileId} />}
    </Box>
  )
}

export default Tabs
