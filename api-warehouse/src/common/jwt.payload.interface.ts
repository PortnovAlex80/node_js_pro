import { UserRole } from '../roles/roles';

export interface JwtPayload {
	email: string;
	role: UserRole;
	iat?: number;
	exp?: number;
}
