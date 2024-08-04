import TrafficCourt from "@/stores/models/TrafficCourt";

class TrafficCourtBuilder {
    constructor() {
      this.trafficCourt = {
        objectId: null,
        name: '',
        address: 'NA',
        stateShortName: '',
        enabled: true
      };
    }
  
    withObjectId(objectId) {
      this.trafficCourt.objectId = objectId;
      return this;
    }
    
    withName(name) {
      this.trafficCourt.name = name;
      return this;
    }

    withAddress(address) {
      this.trafficCourt.address = address || 'NA';
      return this;
    }

    withStateShortName(stateShortName) {
        this.trafficCourt.stateShortName = stateShortName;
        return this;
    }

    withEnabled(enabled) {
      this.trafficCourt.enabled = enabled;
      return this;
    }
  
    build() {
      return TrafficCourt.create(this.trafficCourt);
    }
  }

export default TrafficCourtBuilder;
  