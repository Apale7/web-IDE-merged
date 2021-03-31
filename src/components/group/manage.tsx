import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import { getGroup, group } from "../../api/group";
import { getUserID } from "../../cache/cache";

const { Column } = Table;

export default function GroupManage() {
  const [groups, setGroups] = useState<group[]>([]);
  useEffect(() => {
    const initGroupList = async () => {
      const groups = await getGroup({ owner_id: getUserID() });
      setGroups(groups);
    };
    initGroupList();
  }, []);
  return (
    <Table dataSource={groups} pagination={{ defaultPageSize: 8 }}>
      <Column title="ID" dataIndex="id" key="id" ellipsis={true} />
      <Column title="创建者" dataIndex="owner" key="owner" />
      <Column title="创建时间" dataIndex="created" />
      <Column title="名称" dataIndex="name" key="name" />
      <Column
        title="Action"
        key="action"
        render={(text, record: any) => (
          <Space size="middle">
            <a>成员信息</a>
          </Space>
        )}
      />
    </Table>
  );
}
