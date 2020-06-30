let host = "";
if (process.env.NODE_ENV ==="development") {
  host = "http://localhost:8081";
}
const routes = [
  {
    name: "getgroups",
    url: `${host}/api/groups/getgroups`,
  },
  {
    name: "create",
    url: `${host}/api/groups/create`,
  },
  {
    name: "update",
    url: `${host}/api/groups/update`,
  },
  {
    name: "delete",
    url: `${host}/api/groups/update`,
  },
];
const getRoute = (name) => {
  const route = routes.filter((r) => r.name === name);
  return route[0].url;
};

export default getRoute;
