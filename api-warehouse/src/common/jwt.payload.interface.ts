import { UserRole } from '../roles/permissions';

export interface JwtPayload {
	email: string;
	roles: UserRole;
	iat?: number;
	exp?: number;
}
