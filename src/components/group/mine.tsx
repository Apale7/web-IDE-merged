import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import { getGroup, group } from "../../api/group";
import { getUserID } from "../../cache/cache";
import GroupJoin from "./join";

const { Column } = Table;

export default function GroupMine() {
  const [groups, setGroups] = useState<group[]>([]);
  useEffect(() => {
    const initGroupList = async () => {
      const groups = await getGroup({ member_id: getUserID(), have_me: true });
      setGroups(groups);
    };
    initGroupList();
  }, [groups.length]);
  return (
    <div>
      <GroupJoin setGroups={setGroups}></GroupJoin>
      <Table dataSource={groups} pagination={{ defaultPageSize: 8 }}>
        <Column title="ID" dataIndex="id" key="id" ellipsis={true} />
        <Column title="创建者" dataIndex="owner" key="owner" />
        <Column title="创建时间" dataIndex="created" />
        <Column title="名称" dataIndex="name" key="name" />
      </Table>
    </div>
  );
}
