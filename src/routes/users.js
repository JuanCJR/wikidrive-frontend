let host = "";
if (process.env.NODE_ENV ==="development") {
  host = "http://localhost:8091";
}

const routes = [
  {
    name: "signin",
    url: `${host}/api/users/signin`,
  },
  {
    name: "signup",
    url: `${host}/api/users/signup`,
  },
  {
    name: "reconect",
    url: `${host}/api/users/reconect`,
  },
  {
    name: "getusers",
    url: `${host}/api/users/getusers`,
  },
];

const getRoute = (name) => {
  const route = routes.filter((r) => r.name === name);
  return route[0].url;
};

export default getRoute;
