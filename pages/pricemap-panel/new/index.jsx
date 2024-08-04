'use client'

import { Component } from 'react';
import Router, { withRouter } from 'next/router'; // Importer Router depuis Next.js
import { inject, observer } from 'mobx-react';
import PriceMapForm from '@/components/attorneyPriceMap/form';
import { Box } from '@mui/material';

@inject(({ store }) => store)
@observer
class PriceMapNewPage extends Component {
    state = {
        attorneyId: null,
    };

    async componentDidMount() {
        const { attorneyId } = this.props.router.query;
       
        this.setState({attorneyId})
    }

    async componentDidUpdate(prevProps) {
        const { attorneyId } = this.props.router.query;
       
        if (attorneyId && attorneyId !== prevProps.router.query.attorneyId) {
            this.setState({attorneyId});
        }
    }

  render() {
    const { attorneyId } = this.state;

    return (
      <Box sx={{ paddingTop: 2 }}>
        <PriceMapForm attorneyId={attorneyId} />
      </Box>
    );
  }
}

// Exporter le composant avec le routeur pour obtenir les props du router
export default withRouter(PriceMapNewPage);