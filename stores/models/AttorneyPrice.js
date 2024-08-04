import { types } from 'mobx-state-tree'
import Violation from '@/stores/models/Violation'
import TrafficCounty from '@/stores/models/TrafficCounty'
import TrafficCourt from '@/stores/models/TrafficCourt'

const AttorneyPrice = types
  .model('AttorneyPrice', {
    objectId: types.identifier,
    enabled: types.optional(types.boolean, false),
    attorney: types.string,
    court: types.maybeNull(types.union(TrafficCourt, types.string)),
    county: types.maybeNull(types.union(TrafficCounty, types.string)),
    violation: types.maybeNull(types.union(Violation, types.string)),
    points: types.number,
    price: types.number,
  })
  .views((self) => ({}))
  .actions((self) => ({}))

export default AttorneyPrice
