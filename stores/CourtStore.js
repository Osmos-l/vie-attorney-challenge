import { types, flow } from 'mobx-state-tree'
import TrafficCourt from '@/stores/models/TrafficCourt'
import TrafficCourtBuilder from '@/utils/builders/trafficCourtBuilder'
import axios from 'axios';

const CourtStore = types
  .model('CourtStore', {
    courts: types.array(TrafficCourt),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchTrafficCourts: flow(function* fetchTrafficCourts() {
      try {
        self.isLoading = true;

        const response = yield axios.get('/api/traffic-court-data');

        const trafficCourts = response.data.data.map((trafficCourtData) => (
          new TrafficCourtBuilder()
              .withObjectId(trafficCourtData._id)
              .withName(trafficCourtData.name)
              .withAddress(trafficCourtData.address)
              .withStateShortName(trafficCourtData.stateShortName)
              .withEnabled(trafficCourtData.enabled)
              .build()
        ));

        self.courts = trafficCourts;
      } catch (error) {
        console.error(error);
      }  finally {
        self.isLoading = false;
      }
    }),
  }))

export default CourtStore
