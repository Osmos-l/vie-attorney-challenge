import AttorneyPrice from "@/stores/models/AttorneyPrice";
import Violation from "@/stores/models/Violation";
import ViolationBuilder from "./violationBuilder";
import TrafficCounty from "@/stores/models/TrafficCounty";
import TrafficCountyBuilder from "./trafficCountyBuilder";
import TrafficCourt from "@/stores/models/TrafficCourt";
import TrafficCourtBuilder from "./trafficCourtBuilder";

class AttorneyPriceBuilder {
    constructor() {
      this.attorneyPrice = {
        objectId: null,
        enabled: false,
        attorney: '',
        court: '',
        county: null,
        violation: null,
        points: 0,
        price: 0,
      };
    }
  
    withObjectId(objectId) {
      this.attorneyPrice.objectId = objectId;
      return this;
    }
  
    withEnabled(enabled) {
      this.attorneyPrice.enabled = enabled;
      return this;
    }
  
    withAttorney(attorney) {
      this.attorneyPrice.attorney = attorney;
      return this;
    }
  
    withCourt(court) {
      if (!court) {
        return this;
      }

      if (court.constructor.name === TrafficCourt.name) {
        this.attorneyPrice.court = county;
        return this
      }

      if (typeof court._id === 'undefined') {
        return this;
      }

      const { _id, name, address, stateShortName, enabled} = court;
      this.attorneyPrice.court = new TrafficCourtBuilder()
                                        .withObjectId(_id)
                                        .withName(name)
                                        .withAddress(address)
                                        .withStateShortName(stateShortName)
                                        .withEnabled(enabled)
                                        .build();

      return this;
    }
  
    withPoints(points) {
      this.attorneyPrice.points = points;
      return this;
    }

    withCounty(county) {
      if (!county) {
        return this;
      }

      if (county.constructor.name === TrafficCounty.name) {
        this.attorneyPrice.county = county;
        return this
      }

      if (typeof county._id === 'undefined') {
        return this;
      }

      const { _id, name, shortName, enabled} = county;
      this.attorneyPrice.county = new TrafficCountyBuilder()
                                        .withObjectId(_id)
                                        .withName(name)
                                        .withShortName(shortName)
                                        .withEnabled(enabled)
                                        .build();

      return this;
    }
  
    withPrice(price) {
      this.attorneyPrice.price = price;
      return this;
    }

    withViolation(violation) {
      if (!violation) {
        return this;
      }

      if (violation.constructor.name === Violation.name) {
        this.attorneyPrice.violation = violation;
        return this
      }

      if (typeof violation._id === 'undefined') {
        return this;
      }

      const { _id, name, points} = violation;
      this.attorneyPrice.violation = new ViolationBuilder()
                                        .withObjectId(_id)
                                        .withName(name)
                                        .withPoints(points)
                                        .build();

      return this;
    }
  
    build() {
      return AttorneyPrice.create(this.attorneyPrice);
    }
  }

export default AttorneyPriceBuilder;
  