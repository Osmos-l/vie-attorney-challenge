import Violation from "@/stores/models/Violation";

class ViolationBuilder {
    constructor() {
      this.violation = {
        objectId: null,
        name: '',
        points: 0,
      };
    }
  
    withObjectId(objectId) {
      this.violation.objectId = objectId;
      return this;
    }
    
    withName(name) {
        this.violation.name = name;
        return this;
    }

    withPoints(points) {
        this.violation.points = points;
        return this;
    }
  
    build() {
      return Violation.create(this.violation);
    }
  }

export default ViolationBuilder;
  