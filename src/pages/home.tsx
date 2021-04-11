import { Button, notification } from "antd";
import { withRouter } from "react-router";
import { hasLogined } from "../auth/login";
import LoginButton from "../components/login_button/login_button";

function Home(props: any) {
  props.history.push("/comm");
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        overflow: "hidden",
        padding: "0",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="Menu"
        style={{
          padding: "8px 8px 8px 8px",
          display: "flex",
          backgroundColor: "#2a2d2e",
          //   height: "10%"
        }}
      >
        <LoginButton></LoginButton>
      </div>
      <div
        style={{ height: "85%", backgroundColor: "#ffffff", display: "flex" }}
      >
        <div
          style={{
            padding: "15px 15px 15px 15px",
            margin: "15px 0px 15px 15px",
            backgroundColor: "#007acc",
            height: "60%",
            width: "50%",
          }}
        >
          <h1 style={{ textAlign: "center" }}>社区版</h1>
          <p>在线运行单个C、C++、Java或Python文件</p>
          <Button
            shape="round"
            size="large"
            onClick={() => {
              props.history.push("/comm");
            }}
          >
            进入社区版
          </Button>
        </div>

        <div
          style={{
            padding: "15px 15px 15px 15px",
            margin: "15px 15px 15px 15px",
            backgroundColor: "#007acc",
            height: "60%",
            width: "50%",
          }}
        >
          <h1 style={{ textAlign: "center" }}>专业版</h1>
          <p>连接至Linux容器进行远程开发</p>
          <Button
            shape="round"
            size="large"
            onClick={() => {
              if (hasLogined()) {
                props.history.push("/admin");
              } else {
                notification["info"]({
                  message: "登录以使用专业版",
                  description:
                    "您还未登录！登录后可使用在线IDE专业版。专业版提供完整的Linux容器，可灵活管理、创建开发环境，自由编写任意代码",
                });
              }
            }}
          >
            进入专业版
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
