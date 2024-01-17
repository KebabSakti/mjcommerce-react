import env from "./env";

export default {
  auth: `${env["BASE_URL"]}/auth/user/access`,
  banner: `${env["BASE_URL"]}/user/banner`,
  category: `${env["BASE_URL"]}/user/category`,
};
