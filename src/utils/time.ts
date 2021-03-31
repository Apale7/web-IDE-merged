const parseUnixToLocalTimeString = (time: number): string => {
  if (time < 0) {
    return "未知";
  }
  return new Date(time*1000).toLocaleString();
};

export { parseUnixToLocalTimeString };
