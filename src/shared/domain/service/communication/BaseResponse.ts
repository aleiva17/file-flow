import { ApiProperty } from '@nestjs/swagger';

type BaseResponseProps<T> = |
  { messages: Array<string> } |
  { message: string } |
  { resource: T, message?: string }

export class BaseResponse<T> {
  @ApiProperty()
  public readonly success: boolean;

  @ApiProperty()
  public readonly messages: Array<string>;

  @ApiProperty()
  public readonly resource: T | null;

  constructor(props: BaseResponseProps<T>) {
    if ('resource' in props) {
      this.success = true;
      this.resource = props.resource;
      this.messages = [props.message ?? ''];
      return;
    }

    this.success = false;
    this.resource = null;
    this.messages = ('message' in props) ? [props.message] : props.messages;
  }
}