import { types, flow } from 'mobx-state-tree'
import TrafficCounty from '@/stores/models/TrafficCounty'
import TrafficCountyBuilder from '@/utils/builders/trafficCountyBuilder'
import axios from 'axios';

const CountyStore = types
  .model('CountyStore', {
    counties: types.array(TrafficCounty),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchTrafficCounties: flow(function* fetchTrafficCounties() {
      try {
        self.isLoading = true;

        const response = yield axios.get('/api/traffic-county-data');

        const trafficCounties = response.data.data.map((trafficCountData) => (
          new TrafficCountyBuilder()
              .withObjectId(trafficCountData._id)
              .withName(trafficCountData.name)
              .withShortName(trafficCountData.shortName)
              .withEnabled(trafficCountData.enabled)
              .build()
        ));

        self.counties = trafficCounties;
      } catch (error) {
        console.error(error);
      }  finally {
        self.isLoading = false;
      }
    }),
  }))

export default CountyStore
