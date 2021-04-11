import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AuthRoute from "../components/auth_route/auth_route";
import MyLayOut from "../layout";
import CommunityEdition from "../pages/community_edition";
import Home from "../pages/home";

import Login from "../pages/login";
import ProfessionalEdition from "../pages/professional_edition";
import Register from "../pages/register";
export default function RouterComponent() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} />
        <AuthRoute path="/admin" component={MyLayOut} auth={["login"]} />
        <Route path="/comm" component={CommunityEdition} />
        <AuthRoute
          path="/prof"
          component={ProfessionalEdition}
          auth={["login"]}
        />
        <Route path="/login" component={Login} exact />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
}
