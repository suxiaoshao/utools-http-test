export interface XFormProps {
  key: string;
  value: string;
}

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
