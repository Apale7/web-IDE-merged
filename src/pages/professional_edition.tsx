import "./professional_edition.css";
import React, { useEffect, useState } from "react";
import Monaco from "../components/editor/monaco";
import LanguageSelect from "../components/language_select/language_select";
import {
  getCode,
  getLanguage,
  getAccessToken,
  getUserID,
} from "../cache/cache";
import MyTerminal from "../components/terminal/terminal";

import { useHistory, withRouter } from "react-router-dom";
import DirTree from "../components/dir_tree/dir_tree";
import axios from "../axios/axiosSetting";
import { Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LoginButton from "../components/login_button/login_button";
import queryString from "query-string";
import { startContainer } from "../api/container";
const languages = ["cpp", "java"];

const dirTreeStyle = [
  {
    backgroundColor: "#252526",
    color: "#cccccc",
  },
  {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
];

const saveFile = (containerID: string, path: string, code: string) => {
  return axios.post("api/file/save", {
    container_id: containerID,
    path: path,
    data: code,
  });
};

function ProfessionalEdition(props: any) {
  const history = useHistory();
  const qs = queryString.parse(props.location.search);

  const container_id: string = String(qs.container_id);
  const host = "193.112.177.167:8000";
  const [language, setLanguage] = useState(getLanguage());
  const [code, setCode] = useState("This is the welcome page");
  const [selectedFile, setSelectedFile] = useState("");
  const [needSave, setNeedSave] = useState(false);
  // const size = useWindowSize();
  // const [output, setOutput] = useState("");
  // const [tabKey, setTabKey] = useState("1");
  const autoSave = () => {
    const myInterval = setInterval(() => {
      if (!needSave) return;
      saveFile(container_id, selectedFile, code).then((res) => {
        console.log(res.data.data);
        setNeedSave(false);
      });
    }, 1000);
    return myInterval;
  };
  useEffect(() => {
    const i = autoSave();
    return () => clearInterval(i);
  });
  // useEffect(() => {
  //   const start = async () => {
  //     const success = await startContainer({
  //       user_id: getUserID(),
  //       container_id: container_id,
  //     });
  //     if (success) message.success("启动容器成功！");
  //     else message.error("启动容器失败");
  //   };
  //   start();
  // });
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#007acc",
        height: "100vh",
        overflow: "hidden",
        padding: "0",
      }}
    >
      <div
        className="Menu"
        style={{
          padding: "8px 8px 8px 8px",
          display: "flex",
          backgroundColor: "#2a2d2e",
        }}
      >
        <Input
          placeholder="default size"
          style={{ width: "650px", marginLeft: "5px" }}
          prefix={<UserOutlined />}
        />
        <LoginButton></LoginButton>
      </div>
      <div style={{ display: "flex", height: "93%", overflow: "hidden" }}>
        <div
          style={{
            width: "200px",
            backgroundColor: dirTreeStyle[0].backgroundColor,
            height: "100%",
            border: "1px solid",
          }}
        >
          <DirTree
            style={dirTreeStyle[0]}
            setCode={setCode}
            setSelectedFile={setSelectedFile}
            container_id={container_id}
          />
        </div>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#000000" }}
        >
          <div style={{ width: "100%", height: "65%" }}>
            <Monaco
              language={languages[language]}
              setCode={setCode}
              code={code}
              setNeedSave={setNeedSave}
              prof={true}
            />
          </div>

          <div style={{ height: "33%", overflow: "hidden" }}>
            <MyTerminal
              style={{ height: "100%" }}
              container_id={container_id}
              host={host}
            ></MyTerminal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProfessionalEdition);
