import axios from "axios";
import getRoute from "../routes/users";

export default class UserService {
  //lista usuarios
  async getUsers() {
    const user = await axios.get(getRoute("getusers"));
    return user.data;
  } //

  //Reconecta usuario
  async reconectUser(_id) {
    const user = await axios.post(getRoute("reconect"), {
      _id,
    });
    return user.data;
  } //
  //inicio de sesion
  async signin(userInfo) {
    const user = await axios.post(getRoute("signin"), { userInfo: userInfo });
    return user.data;
  } //

  //Crea usuario
  async signup(userInfo) {
    const user = await axios.post(getRoute("signup"), {
      userInfo: userInfo,
    });
    return user.data;
  } //
}
