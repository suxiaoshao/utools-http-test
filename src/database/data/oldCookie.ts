export interface OldCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  creatTime: number;
  maxAge: {
    use: boolean;
    value: number;
  };
}