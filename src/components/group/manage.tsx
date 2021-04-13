import { Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getGroup, getGroupMembers, group } from "../../api/group";
import { getUserID } from "../../cache/cache";
import MemberList from "./member_table";

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

  const onGetGroupMembers = async (id: number) => {
    const members = await getGroupMembers(id);
    console.log(members);
  };

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
            <MemberList
              group_id={record.id}
              name={record.name}
              onClick={() => {
                onGetGroupMembers(record.id);
              }}
            >
              成员信息
            </MemberList>
          </Space>
        )}
      />
    </Table>
  );
}
