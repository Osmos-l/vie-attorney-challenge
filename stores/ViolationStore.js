import { types, flow } from 'mobx-state-tree'
import Violation from '@/stores/models/Violation'
import ViolationBuilder from '@/utils/builders/violationBuilder'
import axios from 'axios';

const ViolationStore = types
  .model('ViolationStore', {
    violations: types.array(Violation),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchViolations: flow(function* fetchViolations() {
      try {
        self.isLoading = true;

        const response = yield axios.get('/api/violation-data');

        const violations = response.data.data.map((violationData) => (
          new ViolationBuilder()
              .withObjectId(violationData._id)
              .withName(violationData.name)
              .withPoints(violationData.points)
              .build()
        ));

        self.violations = violations;
      } catch (error) {
        console.error(error);
      }  finally {
        self.isLoading = false;
      }
    }),
  }))

export default ViolationStore
