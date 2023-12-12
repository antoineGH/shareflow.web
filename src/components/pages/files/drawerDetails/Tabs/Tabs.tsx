import { useState, type SyntheticEvent } from 'react'
import { useTheme } from '@mui/material'
import TabsMUI from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import StyledTypographyTab from './StyledTypographyTab'
import Comments from '../Comments/Comments'
import Activities from '../Activity/Activities'
import Tags from '../Tags/Tags'

function Tabs() {
  const [value, setValue] = useState(0)
  const theme = useTheme()

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
        value={value}
        onChange={handleChange}
        aria-label="tabs-area"
      >
        {listTabs.map(({ id, label }) => (
          <Tab
            key={id}
            label={
              <StyledTypographyTab
                variant="body2"
                color={theme.palette.secondary.light}
              >
                {label}
              </StyledTypographyTab>
            }
          />
        ))}
      </TabsMUI>
      {value === 0 && <Activities />}
      {value === 1 && <Comments />}
      {value === 2 && <Tags />}
    </Box>
  )
}

export default Tabs
