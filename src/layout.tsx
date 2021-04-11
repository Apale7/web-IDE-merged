import "./layout.css";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
// import { createBrowserHistory } from "history";

import AppRouterComponent from "./routes/app_routes";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "./cache/cache";
import { hasAuths } from "./components/auth_route/auth_route";
import { hasLogined } from "./auth/login";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MyLayOut = (props: any) => {
  const [auths, setAuths] = useState(getAuth());
  const base = "/admin";
  // const history = createBrowserHistory();
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header" style={{ height: "50px" }}>
        {/* <div className="logo" /> */}
        {/* <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu> */}
        <div style={{}}>
          <Button
            type="primary"
            style={{ float: "right", marginTop: "8px" }}
            onClick={() => {
              if (hasLogined()) {
                window.localStorage.clear();
                props.history.push("/comm");
              } else props.history.push("/login");
            }}
          >
            {hasLogined() ? "Sign Out" : "Sign In"}
          </Button>
          <Button
            onClick={() => {
              props.history.push("/comm");
            }}
            style={{ marginTop: "8px", float: "right", marginRight:"5px" }}
          >
            社区版
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={["1"]}
            defaultOpenKeys={["container", "image", "group"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {hasAuths(auths, "container") && (
              <SubMenu key="container" icon={<UserOutlined />} title="容器">
                <Menu.Item key="container_create">
                  <Link to={`${base}/container_create`}>创建容器</Link>
                </Menu.Item>
                <Menu.Item key="container_manage">
                  <Link to={`${base}/container_manage`}>管理容器</Link>
                </Menu.Item>
              </SubMenu>
            )}
            {hasAuths(auths, "image") && (
              <SubMenu key="image" icon={<LaptopOutlined />} title="镜像">
                <Menu.Item key="image_create">
                  <Link to={`${base}/image_create`}>创建镜像</Link>
                </Menu.Item>
                <Menu.Item key="image_manage">
                  <Link to={`${base}/image_manage`}>管理镜像</Link>
                </Menu.Item>
              </SubMenu>
            )}
            {hasAuths(auths, "group") && (
              <SubMenu key="group" icon={<NotificationOutlined />} title="组织">
                {hasAuths(auths, "group_admin") && (
                  <Menu.Item key="group_create">
                    <Link to={`${base}/group_create`}>创建组织</Link>
                  </Menu.Item>
                )}
                {hasAuths(auths, "group_admin") && (
                  <Menu.Item key="group_manage">
                    <Link to={`${base}/group_manage`}>管理组织</Link>
                  </Menu.Item>
                )}
                <Menu.Item key="group_mine">
                  <Link to={`${base}/group_mine`}>我的组织</Link>
                </Menu.Item>
              </SubMenu>
            )}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <div style={{ margin: "16px 0" }}></div>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <AppRouterComponent parent={base}></AppRouterComponent>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default withRouter(MyLayOut);
