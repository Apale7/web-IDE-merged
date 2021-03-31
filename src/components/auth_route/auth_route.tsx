import { useState } from "react";
import { Redirect, Route } from "react-router";
import { getAuth } from "../../cache/cache";
import { routeInfo } from "../../routes";
export default function AuthRoute(props: routeInfo) {
  const [auths, setAuths] = useState(getAuth());
  if (props.auth && !auths.includes("super")) {
    if (!auths.includes("login")) {
      return <Redirect to="/login" />;
    }
    for (let i = 0; i < props.auth.length; i++) {
      const element = props.auth[i];
      if (!auths.includes(element))
        return (
          <h1 style={{ color: "red", fontSize: "25px" }}>无{element}权限</h1>
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
