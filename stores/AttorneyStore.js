import { types, flow } from 'mobx-state-tree'
import Attorney from '@/stores/models/Attorney'
import axios from 'axios';

const AttorneyStore = types
  .model('AttorneyStore', {
    attorneys: types.array(Attorney), // Initialize attorneysPanel as an array of Attorney model
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    // Add views here
  }))
  .actions((self) => ({
    fetchAttorneys: flow(function* fetchAttorneys(searchTerm = '') {
      try {
        self.isLoading = true;

        const response = yield axios.get('/api/attorney-data', {
          params: searchTerm
        });
        
        const attorneys = response.data.data.map((attorney) => ({
          objectId: attorney._id,
          enabled: attorney.enabled,
          chatEnabled: attorney.chatEnabled || false,
          name: attorney.name,
          contactAddress: attorney.address || '559 W Cordova Rd, Santa Fe, New York',
          contactEmail: attorney.email,
          contactPhone: attorney.phone,
        }));

        self.attorneys = attorneys;
      } catch (error) {
        console.error(error);
      }  finally {
        self.isLoading = false;
      }
    }),
    createAttorney: flow(function* createAttorney(attorney) {
      try {
        const payload = {
          name:     attorney.name,
          address:  attorney.contactAddress,
          email:    attorney.contactEmail,
          phone:    attorney.contactPhone
        }

        const response = yield axios.post('/api/attorney-data', payload);
        const { data } = response.data;

        const createdAttorney = {
          objectId: data._id,
          enabled:  data.enabled,
          chatEnabled: data.chatEnabled || false,
          name:     data.name,
          contactAddress: data.address,
          contactEmail:   data.email,
          contactPhone:   data.phone,
        };

        self.attorneys.push(createdAttorney);

      } catch (error) {
        console.error(error);
        throw error;
      }
     

    }),
    updateAttorney: flow(function* updateAttorney(attorney) {}),
    disableAttorney: flow(function* toggleAttorney(attorney) {}),
    // Add more actions here
  }))

export default AttorneyStore
