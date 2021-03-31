import { Table, Tag, Space, Button, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteContainer, getContainer } from "../../api/container";
import { container } from "../../api/container";
import { getUserID } from "../../cache/cache";
const { Column } = Table;

let data: container[] = [];

export default function ContainerManage() {
  const [containers, setContainers] = useState<container[]>([]);
  useEffect(() => {
    const initContainerList = async () => {
      const containers = await getContainer(getUserID());
      setContainers(containers);
    };
    initContainerList();
  }, [containers.length]);

  const onDelete = (containerID: string) => {
    const success = deleteContainer({
      user_id: getUserID(),
      container_id: containerID,
    });
    if (!success) {
      alert("删除容器失败");
    } else {
      setContainers([]); //修改containers通知react重新渲染
    }
  };

  return (
    <Table dataSource={containers} pagination={{ defaultPageSize: 8 }}>
      <Column title="ID" dataIndex="id" key="id" ellipsis={true} />
      <Column title="名称" dataIndex="name" key="name" ellipsis={true} />
      <Column title="创建时间" dataIndex="created" />
      <Column
        title="依赖镜像"
        dataIndex="image"
        key="image_id"
        ellipsis={true}
      />
      <Column title="状态" dataIndex="status" key="status" />

      <Column
        title="Action"
        key="action"
        render={(text, record: any) => (
          <Space size="middle">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
            <Link to={{pathname:"/prof", search:`?container_id=${record.id}`}}>Start</Link>
          </Space>
        )}
      />
    </Table>
  );
}
