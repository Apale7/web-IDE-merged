import { Form, Input, Button, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { createContainer } from "../../api/container";
import { getImage, image } from "../../api/image";
import { getUserID } from "../../cache/cache";
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface ImageOptions {
  imageName: string;
  imageID: string;
  value: string;
}

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

  const [options, setOptions] = useState<ImageOptions[]>([]);

  useEffect(() => {
    const initOptions = async () => {
      const others = await getImage({ userID: getUserID(), isAdmin: false });
      const mine = await getImage({ userID: getUserID(), isAdmin: true });

      const images = others.concat(mine);

      const ops: ImageOptions[] = [];
      const st = new Set<string>();
      images.forEach((i) => {
        if (st.has(i.id)) return;
        st.add(i.id);
        ops.push({
          imageName: i.repoTags.join("|"),
          imageID: i.id,
          value: i.id,
        });
      });

      setOptions(ops);
    };
    initOptions();
  }, []);

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
      <Form.Item name="image_id" label="镜像" rules={[{ required: true }]}>
        <Select>
          {options.map((o) => (
            <Option value={o.value} key={o.imageID}>
              {o.imageName}
            </Option>
          ))}
        </Select>
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
