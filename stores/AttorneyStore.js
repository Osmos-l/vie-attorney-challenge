import { types, flow } from 'mobx-state-tree'
import Attorney from '@/stores/models/Attorney'
import AttorneyBuilder from '@/utils/builders/attorneyBuilder'
import axios from 'axios';

const AttorneyStore = types
  .model('AttorneyStore', {
    attorneys: types.array(Attorney), // Initialize attorneysPanel as an array of Attorney model
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get attorneyById() {
      return (id) => self.attorneys.find(attorney => attorney.objectId === id);
    },
  }))
  .actions((self) => ({
    fetchAttorneys: flow(function* fetchAttorneys(searchTerm = '') {
      try {
        self.isLoading = true;

        const response = yield axios.get('/api/attorney-data', {
          params: searchTerm
        });
        
        const attorneys = response.data.data.map((attorneyData) => (
          new AttorneyBuilder()
              .withObjectId(attorneyData._id)
              .withEnabled(attorneyData.enabled)
              .withChatEnabled(attorneyData.chatEnabled || false)
              .withName(attorneyData.name)
              .withContactAddress(attorneyData.address || '')
              .withContactEmail(attorneyData.email)
              .withContactPhone(attorneyData.phone)
              .build()
        ));

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
        const { attorneyData } = response.data.data;
        const createdAttorney = new AttorneyBuilder()
                                .withObjectId(attorneyData._id)
                                .withEnabled(attorneyData.enabled)
                                .withChatEnabled(attorneyData.chatEnabled || false)
                                .withName(attorneyData.name)
                                .withContactAddress(attorneyData.address)
                                .withContactEmail(attorneyData.email)
                                .withContactPhone(attorneyData.phone)
                                .build()

        self.attorneys.push(createdAttorney);
      } catch (error) {
        console.error(error);
        throw error;
      }
     

    }),
    updateAttorney: flow(function* updateAttorney(id, attorney) {
      try {
        const payload = {
          name:     attorney.name,
          address:  attorney.contactAddress,
          email:    attorney.contactEmail,
          phone:    attorney.contactPhone,
        };
        const response = yield axios.put(`/api/attorney-data/${id}`, payload);
        const { attorneyData } = response.data.data;
        
        const updatedAttorney = new AttorneyBuilder()
                                .withObjectId(attorneyData._id)
                                .withEnabled(attorneyData.enabled)
                                .withChatEnabled(attorneyData.chatEnabled || false)
                                .withName(attorneyData.name)
                                .withContactAddress(attorneyData.address)
                                .withContactEmail(attorneyData.email)
                                .withContactPhone(attorneyData.phone)
                                .build()

        const index = self.attorneys.findIndex(a => a.objectId === attorney.objectId);
        if (index !== -1) {
          self.attorneys[index] = updatedAttorney;
        }
      } catch (error) {
        console.error('Failed to update attorney:', error);
        throw error;
      }
    }),
    disableAttorney: flow(function* toggleAttorney(attorney) {}),
    // Add more actions here
  }))

export default AttorneyStore
