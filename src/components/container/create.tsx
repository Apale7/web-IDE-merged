import { Form, Input, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { createContainer } from "../../api/container";
import { getUserID } from "../../cache/cache";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function ContainerCreate() {
  const onFinish = async (values: any) => {
    const user_id = getUserID();
    const success = await createContainer({ ...values, user_id: user_id });
    if (success) message.success("创建容器成功！");
    else message.error("创建容器失败！");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = useForm();

  // const select = (
  //   <Select
  //     placeholder="Select a option and change input text above"
  //     onChange={(value) => {
  //       console.log(value);
  //     }}
  //     allowClear
  //   >
  //     <Option value="male">male</Option>
  //     <Option value="female">female</Option>
  //     <Option value="other">other</Option>
  //   </Select>
  // );

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
      <Form.Item name="image_id" label="镜像id" rules={[{ required: true }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="容器名称"
        name="container_name"
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
