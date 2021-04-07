import React, { useEffect, useState } from "react";
import { message, Tree } from "antd";

import axios from "../../axios/axiosSetting";
import { languageID,supportedLanguages } from "../language_select/language_select";
import { TreeMap } from "jstreemap";
import { FileStat, getDirectory } from "../../api/container";
const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] {
  // console.log(list.length);

  return list.map((node) => {
    // console.log(node.key, key);

    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}



async function getFile(containerID: string, path: string) {
  return axios.get("/api/file/file", {
    params: {
      container_id: containerID,
      path: path,
    },
  });
}

const DirTree = (props: any) => {
  const [treeData, setTreeData] = useState<DataNode[]>([
    { title: props.path, key: props.path },
  ]);
  useEffect(() => {
    console.log(props.path);
    const path:any = props.path
    if (path[path.length - 1] === "/")
    setTreeData([{ title: path, key: path }]);
    else {
      const prefix = path.substring(0, path.lastIndexOf("/") + 1);
      setTreeData([{ title: prefix, key: prefix }]);
      getFile(props.container_id, path).then((res) => {
        const tmp:[] = path.split(".");
        if (supportedLanguages.includes(tmp[tmp.length - 1]))
        {
          // console.log(tmp[tmp.length - 1]);
          
          props.setLanguage(languageID[tmp[tmp.length - 1]]);
        }
        if (res && res.data && res.data.data && res.data.data.files.length > 0)
        {
          props.setCode(res.data.data.files[0].content);
          props.setSelectedFile(path);
        } else {
          message.error("文件路径有误！")
        }
      });
    }
  }, [props.path]);
  const onLoadData = ({ key, children }: any) => {
    console.log(key);

    return new Promise<void>(async (resolve) => {
      console.log(children);

      if (children) {
        resolve();
        return;
      }

      const files = await getDirectory(props.container_id, key);
      console.log(files);
      setTreeData((origin) =>
        updateTreeData(
          origin,
          key,
          files.map((fileStat: FileStat) => {
            const tmp: DataNode = {
              title: fileStat.file_name,
              key:
                key +
                fileStat.file_name +
                (fileStat.file_type === 0 ? "" : "/"),
              isLeaf: fileStat.file_type === 0,
            };
            // console.log(tmp);
            return tmp;
          })
        )
      );

      resolve();
    });
  };

  const onSelect = (selectedKeys: any, info: any) => {
    if (selectedKeys.length <= 0) return;
    if (selectedKeys[0][selectedKeys[0].length - 1] === "/") {
      if (!info.expanded) onLoadData({ key: info.node.key });
      return;
    }
    console.log(selectedKeys[0]);
    console.log(info);
    getFile(props.container_id, selectedKeys[0]).then((res) => {
      const tmp: [] = selectedKeys[0].split(".");
      props.setLanguage(languageID[tmp[tmp.length - 1]]);
      console.log(res.data.data.files[0]);
      props.setCode(res.data.data.files[0].content);
      props.setSelectedFile(selectedKeys[0]);
    });
  };

  const onExpand = function (expandedKeys: any, info: any) {
    if (!expandedKeys || expandedKeys.length === 0) {
      return;
    }
    console.log("info: ", info);
    // if (!info.expanded)
    onLoadData({ key: info.node.key });
  };
  return (
    <DirectoryTree
      loadData={onLoadData}
      treeData={treeData}
      style={props.style}
      onSelect={onSelect}
      height={950}
      onExpand={onExpand}
      blockNode
    />
  );
};

export default DirTree;
