import { UserRole } from '../roles/permissions';
import { Request } from 'express';

declare global {
	namespace Express {
		export interface Request {
			user: string;
			roles: UserRole;
		}
	}
}
