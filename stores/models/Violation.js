import { types } from 'mobx-state-tree';

const Violation = types
  .model('Violation', {
    objectId: types.identifier,
    name: types.string,
    points: types.number,
  })
  .views((self) => ({}))
  .actions((self) => ({
    disp_name() {
      return `${self.name}`;
    }
  }));

export default Violation;
