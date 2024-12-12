import BaseService from "./BaseService";

class PersonService extends BaseService {
  constructor() {
    super("person");
  }

  //REGISTER
  async register(person) {

    const response = await this.api.post(
      `${this.endPoint}`, person
    );
    return response.data;
  }

  //ACTIVATE
  async activate(person) {

    const response = await this.api.post(
      `${this.endPoint}/activate`, person
    );
    return response.data;
  }

  //LOGIN
  async login(person) {
    const response = await this.api.post(
      `${this.endPoint}/login`, person
    );
    return response.data;
  }

  //FORGOT PASSWORD
    //Recover (1/3- SendEmail
  async recoverSendEmail(email) {

    const response = await this.api.post(
      `${this.endPoint}/recover-email`, { email }
    );
    return response.data;
  }

    //Recover (2/3- VerifyCode
  async recoverVerifyCode(person) {

    const response = await this.api.post(
      `${this.endPoint}/recover-code`, person
    );
    return response.data;
  }

    //Recover (3/3- ChangePassword
  async recoverChangePassword(person) {

    const response = await this.api.post(
      `${this.endPoint}/recover-change`, person
    );
    return response.data;
  }


}
export default PersonService;