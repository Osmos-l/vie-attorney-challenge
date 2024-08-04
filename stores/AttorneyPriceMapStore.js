import { types, flow } from 'mobx-state-tree'
import AttorneyPrice from '@/stores/models/AttorneyPrice'
import axios from 'axios';
import AttorneyPriceBuilder from '@/utils/builders/attorneyPriceBuilder'

const AttorneyPriceMapStore = types
  .model('AttorneyPriceMapStore', {
    priceMap: types.array(AttorneyPrice),
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    // Add views here
  }))
  .actions((self) => ({
    fetchPrices: flow(function* fetchPrices(searchTerm='') {
      try {
        self.isLoading = true;

        const response = yield axios.get('/api/attorney-price-map-data', {
          params: searchTerm
        });

        const priceMap = response.data.data.map((priceMapData) => (
          new AttorneyPriceBuilder()
            .withObjectId(priceMapData._id)
            .withViolation(priceMapData.violation)
            .withAttorney(priceMapData.attorney)
            .withCounty(priceMapData.county)
            .withCourt(priceMapData.court)
            .withPoints(priceMapData.points)
            .withPrice(priceMapData.price)
            .build()
        ));

        self.priceMap = priceMap;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        self.isLoading = false;
      }
    }),
    createPrice: flow(function* createPrice(price) {
      try {
        const payload = {
          attorney:     price.attorney,
          court:      price.court,
          county:     price.county,
          violation:  price.violation,
          points:    price.points,
          price: price.price
        }

        const response = yield axios.post('/api/attorney-price-map-data', payload);
        console.log(response);
        const priceMapData = response.data.data;
        const createdPriceMap = new AttorneyPriceBuilder()
                                .withObjectId(priceMapData._id)
                                .withViolation(priceMapData.violation)
                                .withAttorney(priceMapData.attorney)
                                .withCounty(priceMapData.county)
                                .withCourt(priceMapData.court)
                                .withPoints(priceMapData.points)
                                .withPrice(priceMapData.price)
                                .build()

        self.priceMap.push(createdPriceMap);
      } catch (error) {
        console.error(error);
        throw error;
      }
     

    }),
    updatePrice: flow(function* updatePrice(data) {}),
    deletePrice: flow(function* deletePrice(data) {}),
    // Add more actions here
  }))

export default AttorneyPriceMapStore
