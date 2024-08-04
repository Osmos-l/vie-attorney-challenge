import { types } from 'mobx-state-tree';

const TrafficCourt = types
  .model('TrafficCourt', {
    objectId: types.identifier,
    name: types.string,
    address: types.string,
    stateShortName: types.string,
    enabled: types.optional(types.boolean, true)
  })
  .views((self) => ({}))
  .actions((self) => ({
    disp_name() {
        return `${self.name} (${self.stateShortName})`;
      }
  }));

export default TrafficCourt;
