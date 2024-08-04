import { types } from 'mobx-state-tree'
import ThemeStore from '@/stores/ThemeStore'
import AttorneyStore from '@/stores/AttorneyStore'
import AttorneyPriceMapStore from '@/stores/AttorneyPriceMapStore'
import CourtStore from '@/stores/CourtStore';
import CountyStore from '@/stores/CountyStore';
import ViolationStore from '@/stores/ViolationStore';

const AppStore = types.model('AppStore', {
  attorney: types.optional(AttorneyStore, {}),
  attorneyPriceMap: types.optional(AttorneyPriceMapStore, {}),
  court: types.optional(CourtStore, {}),
  county: types.optional(CountyStore, {}),
  violation: types.optional(ViolationStore, {}),
  theme: types.optional(ThemeStore, {}),
})

const initialStore = {
  attorney: {},
  attorneyPriceMap: {},
  court: {},
  county: {},
  violation: {},
  theme: {},
}

export const createStore = (data = {}) => AppStore.create({ ...initialStore, ...data })

const store = createStore()
export default store
