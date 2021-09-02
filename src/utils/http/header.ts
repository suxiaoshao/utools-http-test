export interface HeaderProps {
  key: string;
  value: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request header 数据
 * */
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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 有其他 http 属性中获取的 header
 * */
export class OtherHeader extends Header {
  isDelete: boolean;

  constructor(key: string, value: string, isDelete = false) {
    super(key, value);
    this.isDelete = isDelete;
  }
}
