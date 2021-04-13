import { useState } from "react";
import { Redirect, Route } from "react-router";
import { getAuth } from "../../cache/cache";
import { routeInfo } from "../../routes";
export default function AuthRoute(props: routeInfo) {
  const [auths] = useState(getAuth());
  //获取用户权限列表
  if (props.auth && !auths.includes("super")) {
    if (!auths.includes("login")) {
      //未登录，直接重定向到登录页面
      return <Redirect to="/login" />;
    }
    for (let i = 0; i < props.auth.length; i++) {//遍历权限列表
      const element = props.auth[i];
      if (!auths.includes(element))
      //权限列表不包含当前元素
        return (
          <h1 style={{ color: "red", fontSize: "25px" }}>无{element}权限</h1>
          //阻止用户访问当前页面
        );
    }
  }

  return (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
}

export function hasAuths(auths: string[], ...needAuths: string[]) {
  if (auths.includes("super")) return true;
  for (let i = 0; i < needAuths.length; i++) {
    const e = needAuths[i];
    if (!auths.includes(e)) return false;
  }
  return true;
}
