import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import { withRouter } from 'next/router';
import PriceMapForm from '@/components/attorneyPriceMap/form';

@inject(({ store }) => ({ priceStore: store.attorneyPriceMap }))
@observer
class PriceMapEditPage extends Component {
    state = {
        priceMap: null,
        loading: true,
      };

    async componentDidMount() {
        const { id } = this.props.router.query;
        if (id) {
            await this.fetchPriceMap(id);
        }
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props.router.query;
        if (id && id !== prevProps.router.query.id) {
            await this.fetchPriceMap(id);
        }
    }

    fetchPriceMap = async (id) => {
        const { priceStore } = this.props;
        this.setState({ loading: true });
    
        try {
          if (!priceStore.priceMap.length) {
            await priceStore.fetchPrices();
          }
          
          const priceMap = priceStore.priceMapById(id);
          if (priceMap) {
            this.setState({ priceMap, loading: false });
          } else {
            this.setState({ loading: false });
          }
        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
      };

    render() {
        const { priceMap, loading } = this.state;

        return (
        <Box
            sx={{paddingTop: 2}}
        >
            {loading ? (
            <Typography>Loading...</Typography>
            ) : (
                <PriceMapForm attorneyId={priceMap.attorney} initialData={priceMap} />
            )}
        </Box>
        )
    }
}

export default withRouter(PriceMapEditPage);
