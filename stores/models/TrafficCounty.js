import { types } from 'mobx-state-tree';

const TrafficCounty = types
  .model('TrafficCounty', {
    objectId: types.identifier,
    name: types.string,
    shortName: types.string,
    enabled: types.optional(types.boolean, true)
  })
  .views((self) => ({}))
  .actions((self) => ({
    disp_name() {
        return `${self.name} (${self.shortName})`;
      }
  }));

export default TrafficCounty;
