import AttorneyPrice from "@/stores/models/AttorneyPrice";

class AttorneyPriceBuilder {
    constructor() {
      this.attorneyPrice = {
        objectId: null,
        enabled: false,
        attorney: '',
        court: '',
        county: '',
        violation: '',
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
      this.attorneyPrice.court = court;
      return this;
    }
  
    withPoints(points) {
      this.attorneyPrice.points = points;
      return this;
    }

    withCounty(county) {
        this.attorneyPrice.county = county;
        return this;
      }
  
    withPrice(price) {
      this.attorneyPrice.price = price;
      return this;
    }

    withViolation(violation) {
        this.attorneyPrice.violation = violation;
        return this;
    }
  
    build() {
      return AttorneyPrice.create(this.attorneyPrice);
    }
  }

export default AttorneyPriceBuilder;
  