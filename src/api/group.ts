import axios from "../axios/axiosSetting";
import { parseUnixToLocalTimeString } from "../utils/time";
export interface group {
  id: number;
  created: number | string;
  ownerID: number;
  name: string;
}

interface getGroupReqParams {
  owner_id?: number;
  group_name?: string;
  group_id?: number;
  member_id?: number;
  have_me?: boolean;
}

const getGroup = async (req: getGroupReqParams) => {
  const res = await axios.get("/admin_api/group/get", {
    params: {
      ...req,
    },
  });
  const groups: group[] = [];
  if (!res || !res.data.data.groups) return groups;
  for (let i = 0; i < res.data.data.groups.length; i++) {
    const e = res.data.data.groups[i];
    groups.push({
      id: e.id,
      created: parseUnixToLocalTimeString(e.created_at),
      ownerID: e.owner_id,
      name: e.group_name,
    });
  }
  return groups;
};

interface createGroupReqParams {
  user_id: number;
  group_name: string;
}

const createGroup = async (req: createGroupReqParams) => {
  const res = await axios.post("/admin_api/group/create", {
    ...req,
  });
  console.log(res);
  if (!res || !res.data) return false;
  return res.data.status_code === 0;
};

const JoinGroup = async (userID: number, groupID: number) => {
  const res = await axios.post("/admin_api/group/join", {
    user_id: userID,
    group_id: groupID,
  });
  console.log(res);
  if (!res || !res.data) return false;
  return res.data.status_code === 0;
};

interface groupMember {
  user_id: number;
  nickname: string;
  email: string;
  phone_number: string;
  avtar_url: string;
}

const getGroupMembers = async (groupID: number) => {
  const res = await axios.get("/admin_api/group/get_group_members", {
    params: { group_id: groupID },
  });
  if (!res || !res.data.data.groups) return [];
  const members: groupMember[] = [];
  for (let i = 0; i < res.data.data.members.length; i++) {
    const e = res.data.data.members[i];
    members.push({
      ...e,
    });
  }
  return members;
};

export { getGroup, createGroup, JoinGroup, getGroupMembers };
