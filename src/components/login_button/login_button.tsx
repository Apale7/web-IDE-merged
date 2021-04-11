import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { isLogin } from "../../auth/login";
import { getAccessToken } from "../../cache/cache";
function LoginButton(props: any) {
  const history = useHistory();
  const onClick = () => {
    if (isLogin()){window.localStorage.clear();
      history.push("/comm");
    } 
    else history.push("/login");
  };
  return (
      <Button
        onClick={onClick}
        size="small"
        type="primary"
        style={{ width: "100px", height: "33px", margin: "0 2px 0 2px" }}
      >
        {getAccessToken().length > 0 ? "sign out" : "sign in"}
      </Button>
  );
}

export default LoginButton;
