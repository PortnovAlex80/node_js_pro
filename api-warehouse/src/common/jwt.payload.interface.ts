import { UserRole } from '../roles/roles';

export interface JwtPayload {
	email: string;
	roles: UserRole;
	iat?: number;
	exp?: number;
}
