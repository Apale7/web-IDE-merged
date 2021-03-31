import { Table, Space, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { getImage, image, deleteImage } from "../../api/image";
import { getUserID } from "../../cache/cache";

const { Column } = Table;

let data: any = [];

export default function ImageManage() {
  const [images, setImages] = useState<image[]>([]);
  useEffect(() => {
    const initImageList = async () => {
      const images = await getImage({ userID: getUserID(), isAdmin: true });
      setImages(images);
    };
    initImageList();
  }, [images.length]);

  const onDelete = (imageID: string) => {
    const success = deleteImage({
      user_id: getUserID(),
      image_id: imageID,
    });
    if (!success) {
      message.error("删除镜像失败");
    } else {
      message.success("删除镜像成功")
      setImages([]); //修改containers通知react重新渲染
    }
  };

  return (
    <Table dataSource={images} pagination={{ defaultPageSize: 8 }}>
      <Column title="ID" dataIndex="id" key="id" ellipsis={true} />
      <Column title="仓库标签" dataIndex="repoTags" key="repoTags" />
      <Column title="创建时间" dataIndex="created" />
      <Column title="大小(MB)" dataIndex="size" key="size" />
      <Column title="创建者" dataIndex="author" key="author" />

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
          </Space>
        )}
      />
    </Table>
  );
}
