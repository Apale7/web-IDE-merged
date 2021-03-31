import axios from "axios";

async function getAuthList(callback: any) {
  callback(["container"]); // in dev env
  return;
  let auth_list: string[] = [];
  await axios.get("/api/user/auth_list").then((res) => {
    if (!res) {
      callback([]);
      return;
    }
    for (let i = 0; i < res.data.data.auth_list.length; i++) {
      auth_list.push(res.data.data.auth_list[i]);
    }
    callback(auth_list);
  });
}

export { getAuthList };
