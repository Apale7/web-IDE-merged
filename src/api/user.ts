import axios from "../axios/axiosSetting";
export { register };

export interface registerInfo {
  username: string;
  password: string;
  nickname: string;
  phone_number: string;
}

interface registerResult {
  result: boolean;
  message: string;
}

const register = async (info: registerInfo) => {
  console.log("info ", info);
  
  const res = await axios.post("/api/user/register", {
    ...info
  });
  let result: registerResult = { result: false, message: "" };
  if (!res) {
    result.message = "服务器错误";
    return result;
  }
  if (res.data.status_code !== 0) {
    // console.log("注册失败");
    result.message = "用户名已存在";
    return result;
  }
  result.message = "注册成功";
  result.result = true;
  return result;
};
