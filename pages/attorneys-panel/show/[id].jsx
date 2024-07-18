import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import { withRouter } from 'next/router';
import AttorneyDetails from '@/components/attorneys/details';

@inject(({ store }) => ({ attorneyStore: store.attorney }))
@observer
class AttorneysPanelPage extends Component {
    state = {
        attorney: null,
        loading: true,
      };

    async componentDidMount() {
        const { id } = this.props.router.query;
        if (id) {
            await this.fetchAttorney(id);
        }
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props.router.query;
        if (id && id !== prevProps.router.query.id) {
            await this.fetchAttorney(id);
        }
    }

    fetchAttorney = async (id) => {
        const { attorneyStore } = this.props;
        this.setState({ loading: true });
    
        try {
          if (!attorneyStore.attorneys.length) {
            await attorneyStore.fetchAttorneys();
          }
          
          const attorney = attorneyStore.attorneyById(id);
          if (attorney) {
            this.setState({ attorney, loading: false });
          } else {
            this.setState({ loading: false });
          }
        } catch (error) {
          this.setState({ loading: false });
        }
      };

    render() {
        const { attorney, loading } = this.state;

        return (
        <Box
            sx={{paddingTop: 2}}
        >
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <AttorneyDetails attorney={attorney} />
            )}
        </Box>
        )
    }
}

export default withRouter(AttorneysPanelPage);
