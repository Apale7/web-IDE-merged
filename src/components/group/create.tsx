import { Form, Input, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";

import { createGroup } from "../../api/group";
import { getUserID } from "../../cache/cache";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function GroupCreate() {
  const onFinish = async (values: any) => {
    const user_id = getUserID();
    const success = await createGroup({ ...values, user_id: user_id });
    if (success) message.success("创建组织成功！");
    else message.error("创建组织失败！");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = useForm();

  return (
    <Form
      {...layout}
      name="createContainer"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      style={{
        maxWidth: "1200px",
        transform: "translate(-50%, -50%) scale(1.0, 1.0)",
        left: "35%",
        top: "50%",
        position: "relative",
      }}
    >
      <Form.Item
        label="团队名称"
        name="group_name"
        rules={[{ required: true, message: "仅用于显示,可随意填写" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </Form.Item>
    </Form>
  );
}
