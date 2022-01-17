const genRandomStr = (length = 30): string => {
  const symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
  return Array.from({ length }).reduce(
    (acc) => `${acc}${symbols[Math.floor(Math.random() * symbols.length)]}`,
    ''
  ) as string;
};

export default genRandomStr;
