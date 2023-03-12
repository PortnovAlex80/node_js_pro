interface IPermissions {
	[path: string]: {
		[method in HttpMethod]?: UserRole[];
	};
}

export enum UserRole {
	Admin = 'admin',
	Manager = 'manager',
	User = 'user',
}

export const PERMISSIONS: IPermissions = {
	// Получить список всех пользователей
	'/users/users': {
		get: [UserRole.Admin],
		post: [UserRole.Admin],
	},
	// Получить информацию о конкретном пользователе
	'/users/users/:id': {
		// get: [UserRole.Admin],
		// put: [UserRole.Admin],
		delete: [UserRole.Manager],
	},
	'/users/users/info': {
		get: [UserRole.Admin, UserRole.Manager],
		// put: [UserRole.Admin],
	},
};

export type HttpMethod = 'get' | 'post' | 'delete' | 'patch' | 'put';
/*
# | **№** | **Path**                   | **Method** | **Body**  | **Response**              | **Description**                                |
# |-------|----------------------------|------------|-----------|---------------------------|------------------------------------------------|
# | 1     | /users                     | GET        | -         | Список пользователей      | Получить список всех пользователей             |
# | 2     | /users/{id}                | GET        | -         | Информация о пользователе | Получить информацию о конкретном пользователе  |
# | 3     | /users                     | POST       | User data | Новый пользователь        | Создать нового пользователя                    |
# | 4     | /users/{id}                | PUT        | User data | Обновленный пользователь  | Обновить информацию о пользователе             |
# | 5     | /users/{id}                | DELETE     | -         | -                         | Удалить пользователя                           |
# | 6     | /users/{id}/roles          | GET        | -         | Список ролей пользователя | Получить список ролей пользователя             |
# | 7     | /users/{id}/roles          | POST       | Role data | -                         | Добавить роль пользователю                     |
# | 8     | /users/{id}/roles/{roleId} | DELETE     | -         | -                         | Удалить роль у пользователя                    |
# | 9     | /login                     | POST       | User creds | Jwt token                | Аутентификация пользователя               
*/
