import "./professional_edition.css";
import { useEffect, useState } from "react";
import Monaco from "../components/editor/monaco";
import { getLanguage, getUserID } from "../cache/cache";
import MyTerminal from "../components/terminal/terminal";

import { withRouter } from "react-router-dom";
import DirTree from "../components/dir_tree/dir_tree";
import axios from "../axios/axiosSetting";
import { Button, Input, message, Form, AutoComplete, Menu } from "antd";
import { FileOutlined } from "@ant-design/icons";
import LoginButton from "../components/login_button/login_button";
import queryString from "query-string";
import { FileStat, getDirectory, startContainer } from "../api/container";
import { Header } from "antd/lib/layout/layout";
const languages = ["cpp", "java", "javascript", "python"];

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
  // const history = useHistory();
  const qs = queryString.parse(props.location.search);

  const container_id: string = String(qs.container_id); //容器id
  const host = "193.112.177.167:8000"; //终端服务器的host
  const [language, setLanguage] = useState(getLanguage()); //当前文件的语言，打开文件时根据后缀名自动识别
  const [code, setCode] = useState("This is the welcome page"); //当前编辑器中的内容
  const [selectedFile, setSelectedFile] = useState(""); //当前打开的文件的路径
  const [needSave, setNeedSave] = useState(false); //修改文件后为true，触发自动保存
  const [path, setPath] = useState("/root/"); //当前打开的文件夹路径

  const [options, setOptions] = useState<{ value: string }[]>([]);
  const onSearch = async (searchText: string) => {
    if (!searchText) setOptions([]);
    const prefix = searchText.substring(0, searchText.lastIndexOf("/") + 1);
    console.log("prefix: ", prefix);

    const files: [] = await getDirectory(container_id, prefix);
    // console.log(files);

    setOptions(
      files.map((file: FileStat) => {
        return { value: String(prefix + file.file_name) };
      })
    );
  };
  const onSelect = (data: string) => {
    // props.setPath(data);
  };
  const onChange = (data: string) => {
    // props.setPath(data);
  };
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
  useEffect(() => {
    const start = async () => {
      const success = await startContainer({
        user_id: getUserID(),
        container_id: container_id,
      });
      if (success) message.success("启动容器成功！");
      else message.error("启动容器失败");
    };
    start();
  }, []);

  const onOpenClick = (a: any) => {
    setPath(a.path);
    // console.log(a);
  };
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
      <Header
        className="Menu"
        style={{
          height: "50px",
          padding: "8px 8px 8px 8px",
          display: "flex",
          backgroundColor: "#2a2d2e",
        }}
      >
        <Form layout="inline" onFinish={onOpenClick}>
          <Form.Item name="path">
            <AutoComplete
              options={options}
              style={{ width: "650px", marginLeft: "5px" }}
              onSelect={onSelect}
              onSearch={onSearch}
              onChange={onChange}
              defaultValue={path}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              open
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{ alignSelf: "center", marginLeft: "auto", display: "flex" }}
        >
          <Button
            onClick={() => {
              props.history.push("/comm");
            }}
            style={{ margin: "1px 2px 0 2px" }}
            // size="small"
          >
            社区版
          </Button>
          <LoginButton></LoginButton>
        </div>
      </Header>
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
            setLanguage={setLanguage}
            path={path}
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
