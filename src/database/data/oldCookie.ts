export interface OldCookie {
  name: string | undefined;
  value: string | undefined;
  domain: string | undefined;
  path: string | undefined;
  creatTime: number | undefined;
  maxAge:
    | {
        use: boolean | undefined;
        value: number | undefined;
      }
    | undefined;
}
