import { Switch } from "react-router";
import AuthRoute from "../components/auth_route/auth_route";
import ContainerCreate from "../components/container/create";
import ContainerManage from "../components/container/manage";
import GroupCreate from "../components/group/create";
import GroupMine from "../components/group/mine";
import GroupManage from "../components/group/manage";
import ImageCreate from "../components/image/create";
import ImageManage from "../components/image/manage";
export default function AppRouterComponent(props: any) {
  return (
    <Switch>
      <AuthRoute
        path={`${props.parent}/container_create`}
        component={ContainerCreate}
        auth={["container"]}
      ></AuthRoute>
      <AuthRoute
        path={`${props.parent}/container_manage`}
        component={ContainerManage}
        auth={["container"]}
      ></AuthRoute>
      <AuthRoute
        path={`${props.parent}/image_create`}
        component={ImageCreate}
        auth={["image"]}
      ></AuthRoute>
      <AuthRoute
        path={`${props.parent}/image_manage`}
        component={ImageManage}
        auth={["image", "image_admin"]}
      ></AuthRoute>
      <AuthRoute
        path={`${props.parent}/group_create`}
        component={GroupCreate}
        auth={["group", "group_admin"]}
        //创建团队需要group权限和group_admin权限
      ></AuthRoute>
      <AuthRoute
        path={`${props.parent}/group_manage`}
        component={GroupManage}
        auth={["group", "group_admin"]}
      ></AuthRoute>
      <AuthRoute
        path={`${props.parent}/group_mine`}
        component={GroupMine}
        auth={["group"]}
        //查看自己的团队需要group权限
      ></AuthRoute>
    </Switch>
  );
}
