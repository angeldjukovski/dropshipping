import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "user/schema/user-role.enum";
import { RoleValidatorType } from "common/type/role.validator.enum";
import { Logger } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesConfig = this.reflector.getAllAndOverride<{
      roles: UserRole[];
      type: RoleValidatorType;
    }>('rolesConfig', [context.getHandler(), context.getClass()]);
     
    console.log("Test",rolesConfig)

    if (!rolesConfig) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    console.log("User in request", user);

    this.logger.debug('User object', user);

    if (!user) {
      this.logger.error('User not found in request');
      throw new ForbiddenException('User not found');
    }

    if (!user.role) {
      this.logger.error('User role not found in request');
      throw new ForbiddenException('User role not found');
    }

    if (!Array.isArray(rolesConfig.roles)) {
      throw new ForbiddenException('Roles not found');
    }

    this.logger.debug(`User role: ${user.role}`);
    this.logger.debug(`Required roles: ${rolesConfig.roles}`);
    this.logger.debug(`RoleValidatorType: ${rolesConfig.type}`);

    const hasAccess = rolesConfig?.roles?.includes(user.role)
console.log("RolesGuard is running"); 
console.log("RolesConfig:", rolesConfig); 
console.log("Roles required:", rolesConfig?.roles);
console.log("User role in request:", user.role);

if (!hasAccess) {
  this.logger.warn(` Access Denied - User role "${user.role}" is not in ${rolesConfig?.roles}`);
} else {
  this.logger.log(` Access Granted - User role "${user.role}" matches ${rolesConfig?.roles}`);
}

if (!hasAccess) {
  this.logger.warn(` Access Denied - User role "${user.role}" is not in ${rolesConfig.roles}`);
}

    switch (rolesConfig.type) {
      case RoleValidatorType.HasAllOfThese:
        return rolesConfig.roles.every((role) => user.role === (role));
      case RoleValidatorType.HasSomeOfThese:
        return rolesConfig.roles.some((role) => user.role === (role));
      case RoleValidatorType.HasNotHaveAllOfThese:
        return !rolesConfig.roles.every((role) => user.role === (role));
      case RoleValidatorType.HasNotHaveAnyOfThese:
        return !rolesConfig.roles.some((role) => user.role === (role));
      default:
        return false;
    }
  }
}