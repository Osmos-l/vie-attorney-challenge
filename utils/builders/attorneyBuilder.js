class AttorneyBuilder {
    constructor() {
      this.attorney = {
        objectId: null,
        enabled: false,
        chatEnabled: false,
        name: '',
        contactAddress: '',
        contactEmail: '',
        contactPhone: '',
      };
    }
  
    withObjectId(objectId) {
      this.attorney.objectId = objectId;
      return this;
    }
  
    withEnabled(enabled) {
      this.attorney.enabled = enabled;
      return this;
    }
  
    withChatEnabled(chatEnabled) {
      this.attorney.chatEnabled = chatEnabled;
      return this;
    }
  
    withName(name) {
      this.attorney.name = name;
      return this;
    }
  
    withContactAddress(contactAddress) {
      this.attorney.contactAddress = contactAddress;
      return this;
    }
  
    withContactEmail(contactEmail) {
      this.attorney.contactEmail = contactEmail;
      return this;
    }
  
    withContactPhone(contactPhone) {
      this.attorney.contactPhone = contactPhone;
      return this;
    }
  
    build() {
      return this.attorney;
    }
  }

export default AttorneyBuilder;
  