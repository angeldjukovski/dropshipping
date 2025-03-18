import { createParamDecorator, ExecutionContext,} from '@nestjs/common';
import { CurrentUser,} from 'common/type/current-user.interface';

export const GetUser = createParamDecorator (
(data: keyof CurrentUser | undefined, context: ExecutionContext): CurrentUser => {
const request = context.switchToHttp().getRequest()
const user : CurrentUser = request.user
return data ? user[data] as unknown as CurrentUser : user
}
)
