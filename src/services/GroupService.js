import getRoute from "../routes/groups";
import axios from "axios";

export default class GroupService {
  //Funcion para listar grupos
  async getGroups() {
    const groups = await axios.get(getRoute("getgroups"));
    return groups.data;
  }

  //Funcion para crear grupo
  async createGroup(groupInfo) {
    const group = await axios.post(getRoute("create"), {
      groupInfo: groupInfo,
    });

    return group.data;
  }
}
