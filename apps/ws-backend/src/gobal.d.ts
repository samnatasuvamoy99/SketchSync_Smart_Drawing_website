declare module "cookie" {
  const cookie: {
    parse(str: string): Record<string, string>;
  };

  export default cookie;
}