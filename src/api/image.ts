import axios from "../axios/axiosSetting";

export interface image {
  key: string;
  id: string;
  repoTags: string[];
  created: number | string;
  size: number | string;
  author: string;
}

interface getImageReqParams {
  userID?: number;
  imageID?: string;
  isAdmin?: boolean;
}

const getImage = async (req: getImageReqParams) => {
  const res = await axios.get("/admin_api/image/get", {
    params: {
      user_id: req.userID,
      image_id: req.imageID,
      is_admin: req.isAdmin,
    },
  });

  if (!res || !res.data.data.images) return [];
  const images: image[] = [];
  for (let i = 0; i < res.data.data.images.length; i++) {
    const e = res.data.data.images[i];
    images.push({
      key: String(i),
      id: e.id,
      //   name: e.name.substr(0, 20) + (e.name.length > 20 ? "..." : ""),
      created: new Date(e.created * 1000).toLocaleString(),
      //   image: e.image.split(":")[1].substr(0, 7) + "...",
      size: (e.size / 1024 / 1024).toFixed(2),
      author: e.author,
      repoTags: e.repoTags,
    });
  }
  return images;
};

interface createImageReq {
  type: number;
  user_id: number;
  dockerfile?: string;

  respositry_url?: string;
  tag?: string;
  username?: string;
  password?: string;

  image_url?: string;
}

const createImage = async (req: createImageReq) => {
  const res = await axios.post("/admin_api/image/create", { ...req });
  console.log(res);
  if (!res || !res.data) return false;
  return res.data.status_code === 0;
};

interface deleteImageReq {
  user_id: number;
  image_id: string;
}

const deleteImage = async (req: deleteImageReq) => {
  const res = await axios.post("/admin_api/image/delete", { ...req });
  console.log(res);
  if (!res || !res.data) return false;
  return res.data.status_code === 0;
};

export { getImage, createImage, deleteImage };
