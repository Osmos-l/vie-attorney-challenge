import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import AttorneyForm from '@/components/attorneys/form'
import { Box, Typography } from '@mui/material'

@inject(({ store }) => store)
@observer
class AttorneysPanelPage extends Component {

  render() {
    return (
      <Box
        sx={{paddingTop: 2}}
      >
        <AttorneyForm />
      </Box>
    )
  }
}

export default AttorneysPanelPage
