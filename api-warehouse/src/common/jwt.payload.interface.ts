import { UserRole } from '../roles/permissions';

export interface JwtPayLoad {
	email: string;
	roles: UserRole;
	iat?: number;
	exp?: number;
}
