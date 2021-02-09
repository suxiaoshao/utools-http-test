export interface XFormProps {
  key: string;
  value: string;
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description x-www-form-urlencoded 的单项数据
 * */
export class RequestXForm implements XFormProps {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public static formXFormProps(xForm: XFormProps): RequestXForm {
    return new RequestXForm(xForm.key, xForm.value);
  }
}
