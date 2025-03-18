import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'user/schema/user-role.enum';
import { RoleValidatorType } from 'common/type/role.validator.enum';

export const Role = (
    roles: UserRole[],
    type: RoleValidatorType = RoleValidatorType.HasSomeOfThese,
  ) => SetMetadata('rolesConfig', { roles, type });
