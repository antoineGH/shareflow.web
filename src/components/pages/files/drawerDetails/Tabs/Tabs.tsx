import { useState, type SyntheticEvent } from 'react'
import TabsMUI from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import StyledTypographyTab from './StyledTypographyTab'
import { useTheme } from '@mui/material'

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
      {value === 0 && <Box p={3}>{listTabs[0].label}</Box>}
      {value === 1 && <Box p={3}>{listTabs[1].label}</Box>}
      {value === 2 && <Box p={3}>{listTabs[2].label}</Box>}
    </Box>
  )
}

export default Tabs
