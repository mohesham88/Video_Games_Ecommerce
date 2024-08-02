import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/utils/common/user-roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);