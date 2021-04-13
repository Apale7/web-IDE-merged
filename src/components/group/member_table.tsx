import { Modal, Table } from "antd";
import Column from "antd/lib/table/Column";
import { useEffect, useState } from "react";
import { getGroupMembers, groupMember } from "../../api/group";

export default function MemberList(props: any) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [members, setMembers] = useState<groupMember[]>([]);

  useEffect(() => {
    const initMemberList = async () => {
      const members = await getGroupMembers(props.group_id);
      setMembers(members);
    };
    initMemberList();
  }, []);

  return (
    <>
      <a onClick={()=> {showModal()}}>成员信息</a>
      <Modal
        title={props.name + '的成员'}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={"800px"}
      >
        <Table dataSource={members} pagination={{ defaultPageSize: 8 }}>
          <Column title="序号" dataIndex="key" key="id"></Column>
          <Column title="姓名" dataIndex="nickname" key="nickname" />
          {/* <Column title="加入时间" dataIndex="created" /> */}
          {/* <Column title="组织名" dataIndex="name" key="name" /> */}
        </Table>
      </Modal>
    </>
  );
}
