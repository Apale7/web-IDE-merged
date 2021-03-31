import { getTokens } from "../cache/cache";

const isLogin = () => {
  // return true; // in dev env
  const [accessToken, refreshToken, accessExp, refreshExp] = getTokens();
  const now = Date.parse(new Date().toString()) / 1000;
  console.log("access_exp", accessExp);
  console.log("now", now);

  return String(accessToken).length > 0 && accessExp > now;
};

//曾经登录过
const hasLogined = () => {
  const [accessToken, refreshToken, accessExp, refreshExp] = getTokens();
  return String(accessToken).length > 0;
};

export { isLogin, hasLogined };
