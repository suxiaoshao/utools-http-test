export interface HeaderProps {
  key: string;
  value: string;
}

export class Header implements HeaderProps {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public static formHeaderProp(headerProp: HeaderProps): Header {
    return new Header(headerProp.key, headerProp.value);
  }
}

export class OtherHeader extends Header {
  isDelete: boolean;

  constructor(key: string, value: string, isDelete = false) {
    super(key, value);
    this.isDelete = isDelete;
  }
}
