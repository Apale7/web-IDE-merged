import { Form, Input, Upload, Button, message, Tabs } from "antd";
import { useForm } from "antd/lib/form/Form";
import { createImage } from "../../api/image";
import { getUserID } from "../../cache/cache";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TabPane } = Tabs;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function ImageCreate() {
  const onFinish = async (values: any) => {
    const success = await createImage({ ...values, user_id: getUserID() });
    if (success) message.success("创建镜像成功！");
    else message.error("创建镜像失败！");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Tabs type="card">
      <TabPane tab="by dockerfile" key="1">
        <CreateByDockerFile
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </TabPane>
      <TabPane tab="by repo url" key="2">
        <PullImage></PullImage>
      </TabPane>
      <TabPane tab="by upload" key="3">
        <UploadImage></UploadImage>
      </TabPane>
    </Tabs>
  );
}

const CreateByDockerFile = (props: any) => {
  const [form] = useForm();

  return (
    <Form
      {...layout}
      name="createContainer"
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
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
        label="dockerfile"
        name="dockerfile"
        rules={[
          { required: true, message: "用于初始化docker镜像，必须填写！" },
        ]}
      >
        <TextArea style={{ height: "400px" }} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </Form.Item>
    </Form>
  );
};

const PullImage = () => {
  const onFinish = async (values: any) => {
    const success = await createImage({ ...values, user_id: getUserID(),type: 1 });
    if (success) message.success("创建镜像成功！");
    else message.error("创建镜像失败！");
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form
      onFinish={onFinish}
      {...layout}
      style={{
        maxWidth: "1200px",
        transform: "translate(-50%, -50%) scale(1.0, 1.0)",
        left: "35%",
        top: "50%",
        position: "relative",
      }}
    >
      <Form.Item label="仓库名" name="respositry_url" required>
        <Input placeholder="dockerhub、阿里云等docker镜像仓库的链接"></Input>
      </Form.Item>
      <Form.Item label="镜像标签" name="tag">
        <Input placeholder="默认为latest"></Input>
      </Form.Item>
      <Form.Item label="用户名" name="username">
        <Input placeholder="私有仓库才需填写"></Input>
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input placeholder="私有仓库才需填写" type="password"></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};

const UploadImage = (props: any) => {
  let downloadUrl = "";
  const attrs = {
    name: "file",
    // multiple: true,
    action: "/upload",
    // beforeUpload: async (file: File) => {
    //   let f = {...file}
    //   f.name = "123"
    //   return f;
    // },
    data: {
      user_id: getUserID(),
      type: "image",
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file.response);
        downloadUrl = info.file.response.data;
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onSubmit = async () => {
    if (downloadUrl === "") {
      message.error("请上传镜像文件！");
      return;
    }

    const success = await createImage({
      user_id: getUserID(),
      type: 2,
      image_url: downloadUrl,
    });
    if (success) message.success("创建镜像成功！");
    else message.error("创建镜像失败！");
  };

  return (
    <div>
      <Dragger {...attrs}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击此处选择文件或拖拽上传</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Button type="primary" onClick={onSubmit} style={{ float: "right" }}>
        创建
      </Button>
    </div>
  );
};
