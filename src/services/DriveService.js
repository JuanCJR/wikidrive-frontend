import axios from "axios";
import getRoute from "../routes/drive";
export default class DriveService {
  //Cambia nombre de objeto
  async changeName(route, newName, oldName) {
    const result = await axios.post(getRoute("changename"), {
      route: route,
      oldName: oldName,
      newName: newName,
    });
    return result.data;
  }
  // elimina archivo
  async deleteFile(route, dirName) {
    const result = await axios.post(getRoute("deletefile"), {
      route: route,
      dirName: dirName,
    });
    return result.data;
  }

  // elimina directorio vacio
  async deleteSimpleDir(route, dirName) {
    const result = await axios.post(getRoute("simpledelete"), {
      route: route,
      dirName: dirName,
    });
    return result.data;
  }
  //Elimina directorio recursivamente
  async deleteRecursiveDir(route, dirName) {
    const result = await axios.post(getRoute("recursivedelete"), {
      route: route,
      dirName: dirName,
    });
    return result.data;
  }

  //Descarga archivos
  async downloadFile(route, filename) {
    const downloadRoute = getRoute("download");
    const link = document.createElement("a");
    link.href = `${downloadRoute}/?route=${route}&filename=${filename}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //sube archivo
  async uploadFile(formData) {
    const dirs = await axios.post(getRoute("upload"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return dirs.data;
  } //

  //Lista directorio y archivos
  async getDir(route, userName, userType) {
    const dirs = await axios.post(getRoute("getdir"), {
      route: route,
      userName: userName,
      userType: userType,
    });
    return dirs.data;
  } //

  //Crea directorio
  async createDir(objInfo) {
    const dirs = await axios.post(getRoute("createdir"), {
      objInfo: objInfo,
    });
    return dirs.data;
  } //
}
