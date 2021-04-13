import {
  Modal,
  Button,
  Form,
  Input,
  Table,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getGroup, group, JoinGroup } from "../../api/group";
import { getUserID } from "../../cache/cache";
const { Column } = Table;
export default function GroupJoin(props: any) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
    props.setGroups([]);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [groups, setGroups] = useState<group[]>([]);
  useEffect(() => {
    const initGroupList = async () => {
      const groups = await getGroup({
        // owner_id: getUserID(),
        have_me: false,
        member_id: getUserID(),
      });
      setGroups(groups);
    };
    initGroupList();
  }, []);

  const onJoin = async (group_id: number) => {
    const success = await JoinGroup(getUserID(), group_id);
    if (success) message.success("加入成功！");
    else message.error("加入失败！");
  };

  return (
    <>
      <Button style={{ float: "right" }} type="primary" onClick={showModal}>
        加入
      </Button>
      <Modal
        title="加入"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={"800px"}
      >
        <Form
          layout="inline"
          onFinish={async (a: any) => {
            const groups = await getGroup({
              have_me: false,
              ...a,
              member_id: getUserID(),
            });
            setGroups(groups);
          }}
        >
          <Form.Item label="OwnerID" style={{ width: "250px" }} name="owner_id">
            <Input placeholder="创建者的ID" />
          </Form.Item>
          <Form.Item label="Name" name="group_name" style={{ width: "250px" }}>
            <Input placeholder="组织名，支持前缀模糊搜索" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Find
            </Button>
          </Form.Item>
        </Form>

        <Table dataSource={groups} pagination={{ defaultPageSize: 8 }}>
          <Column title="ID" dataIndex="id" key="id" ellipsis={true} />
          <Column title="创建者" dataIndex="owner" key="owner" />
          <Column title="创建时间" dataIndex="created" />
          <Column title="组织名" dataIndex="name" key="name" />
          <Column
            title="Action"
            key="action"
            render={(text, record: any) => (
              <Space size="middle">
                <Popconfirm
                  title="你真的确定要加入吗?"
                  onConfirm={() => onJoin(record.id)}
                >
                  <a>加入</a>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </Modal>
    </>
  );
}
