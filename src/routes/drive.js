let host = "";
if (process.env.NODE_ENV ==="development") {
  host = "http://localhost:8091";
}
const routes = [
  {
    name: "getdir",
    url: `${host}/api/drive/getdir`,
  },
  {
    name: "createdir",
    url: `${host}/api/drive/dir/createdir`,
  },
  {
    name: "upload",
    url: `${host}/api/drive/file/upload`,
  },
  {
    name: "download",
    url: `${host}/api/drive/file/download`,
  },
  {
    name: "changename",
    url: `${host}/api/drive/changename`,
  },
  {
    name: "simpledelete",
    url: `${host}/api/drive/dir/simpledelete`,
  },
  {
    name: "recursivedelete",
    url: `${host}/api/drive/dir/recursivedelete`,
  },
  {
    name: "deletefile",
    url: `${host}/api/drive/file/delete`,
  },
  {
    name: "recyclebin",
    url: `${host}/api/drive/recyclebin`,
  },
];
const getRoute = (name) => {
  const route = routes.filter((r) => r.name === name);
  return route[0].url;
};

export default getRoute;
