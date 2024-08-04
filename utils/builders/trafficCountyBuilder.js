import TrafficCounty from "@/stores/models/TrafficCounty";

class TrafficCountyBuilder {
    constructor() {
      this.trafficCounty = {
        objectId: null,
        name: '',
        shortName: '',
        enabled: true
      };
    }
  
    withObjectId(objectId) {
      this.trafficCounty.objectId = objectId;
      return this;
    }
    
    withName(name) {
      this.trafficCounty.name = name;
      return this;
    }

    withShortName(shortName) {
      this.trafficCounty.shortName = shortName;
      return this;
    }

    withEnabled(enabled) {
      this.trafficCounty.enabled = enabled;
      return this;
    }
  
    build() {
      return TrafficCounty.create(this.trafficCounty);
    }
  }

export default TrafficCountyBuilder;
  