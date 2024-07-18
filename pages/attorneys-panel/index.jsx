import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import AttorneysSearchPanel from '@/components/attorneys/searchPanel'
import { Box } from '@mui/material'

@inject(({ store }) => store)
@observer
class AttorneysPanelPage extends Component {
  render() {
    return (
      <Box
        sx={{paddingTop: 2}}
      >
        <AttorneysSearchPanel />
      </Box>
    )
  }
}

export default AttorneysPanelPage
