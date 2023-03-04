# Система управления складом версия 0.0.1

## Оглавление

1. [Концепция системы](#карточка-проекта-концепция-системы)
2. [Тип проекта](#тип-проекта-серверная-часть-бекенд-nodejs-системы-управления-складом)
3. [Пользователи](#пользователи-системы)
4. [Роли пользователей](#роли-пользователей-в-системе)
5. [Функциональные требования](#основные-функциональные-требования)
6. [Дополнительные требования](#дополнительные-требования)
7. [Пользовательские требования](#пользовательские-требования)
8. [Проектирование REST API](#проектирование-rest-api)
9. [Участники](#участники)
10. [Обобщенный процесс взаимодействия с системой](#обобщенный-процесс-взаимодействия-с-системой)
11. [Проектирование методов](#проектирование-методов)
12. [Модель предметной области. ER diagram](#модель-предметной-области-er-diagram)

------------
**⚠️ ПРИМЕЧАНИЕ**

_Это учебный проект курса https://www.udemy.com/course/nodejs-start/ (https://learn.purpleschool.ru/public/products) в рамках которого необходимо отработать навык реализации слоеной архитектуры (middlewares, exceptions filters,  controller, error handler, services, repository, orm prisma) для выполнения CRUD операций с ресурсом (товары на складе) и JWT авторизация с ролевой моделью. Просьба не брать описание проекта за основу, так как он не выверен профессиональными системными аналитиками. Документацию на API привести в формате openAPI. Предоставить swagger.
CRUD для управления новыми пользователями в рамках данного релиза не требуется._

&#128736;  Инструменты для редактирования README.md
- https://github.com/GnuriaN/format-README/blob/master/README.md
- https://structurizr.com/
- https://tableconvert.com/markdown-generator
- https://pandao.github.io/editor.md/en.html
- https://editor.swagger.io/
- https://emojio.ru/objects/d83ddee0-1f6e0-molot-i-gaechnyy-klyuch.html
- https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19099026#overview пример проектирования метода by Stephen Grider
------------


## Тип проекта: серверная часть (бекенд NodeJS) системы управления складом  

## Концепция системы (Фрагмент Карточки проекта)

| Карточка проекта              |                                                                                                                                                                                                                                          |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Автоматизируемая деятельность | Управление складом (отслеживание актуальным состоянием склада)                                                                                                                                                                           |
| Заинтересованные стороны      | Пользователи услуг склада, Владельц склада, Работники склада                                                                                                                                                                             |
| Текущее решение               | Учет и регистрация товаров на складе ведется вручную с использованием журналов                                                                                                                                                           |
| Решаемые проблемы             | Уменьшение ошибок, вызванных человеческим фактором: ошибки при записи в журнал, расчет количества остатков, учет суммарного веса, объема товаров, снижение затрат на бумажные носители, увеличение скорости обслуживания клиентов склада |
| Целевая ситуация              |                                                                                                                                                                                                                                          |
| Цель для заказчика            | Снизить расходы на операционную деятельность по управлению склада на 20%, увеличить приток клиентов на 15%                                                                                                                               |
| Назначение                    | Для пользователй услуг склада: увеличить скорость обслуживания от момента поступления заявки до выдачи или приемки товара на склад,                                                                                                      |
|                               | Для работника склада: автоматизировать процессы приемки и выдачи товаров, инвентаризации склада                                                                                                                                          |

## Основные функциональные требования
_Лексическая формула требований: [Условие][Субъект][Действие][Объект][Ограничение/Значение]_  
### Релиз 1
1. Система должна хранить информацию о заполненности склада товарами (Емкость склада ограничена площадью зоны хранения)
2. Система должна поддерживать авторизированный доступ к системе с ограничением по доступу к функционалу согласно ролевой модели. 
3. Система должна обеспечивать генерацию нового типа Пользователя с набором прав доступа (Администратор, Начальник склада)
4. Система должна обеспечить по запросу Пользователя операцию по предоставлению всех товаров на складе.   
5. Система должна обеспечить по запросу Пользователя операцию по добавлению товара на склад с указанием причины добавления и источника.
6. Система должна обеспечить по запросу Пользователя операцию по удалению товара со склада, направление убытия и причина убытия.  
7. Система должна обеспечить по запросу Пользователя операцию по изменению свойств товара с указанием причин изменения. Нулевое значение количества отстатков не приводит к удалению товара со склада.
8. Система должна обеспечить поиск с фильтрацией товара на складе по различным параметрам, таким как наименование товара, количество, стоимость, дата добавления.

## Пользователи системы

| Пользователь | Описание                                       |
|------------------------------------|---|
| Работник | Работник склада. Роль - Администратор системы      |
| Работник | Работник склада. Роль - Начальник склада           |

## Пользовательские требования

> **Пользовательские требования** - это требования, выраженные пользователями и описывающие, каким образом система должна быть использована. Эти требования обычно формулируются на естественном языке и представляют собой описание того, что должна делать система для пользователя, а не как она это должна делать.  
**Функциональные требования**, с другой стороны, описывают, каким образом система должна выполнять конкретную функцию или задачу. Они описывают, что должна делать система и как она должна это делать. Функциональные требования обычно выражаются в терминах конкретных функций, операций или процессов, которые система должна выполнять.  
**Таким образом**, пользовательские требования фокусируются на том, что должна делать система для пользователя, а функциональные требования - на том, каким образом это должно происходить в системе.

### Реестр пользовательских требований. 
Релиз 1
| №UserReq | Пользовательское требование                                                                                            |
|----------|------------------------------------------------------------------------------------------------------------------------|
| 1        | Возможность авторизироваться в системе и получать доступ к своим данным и функционалу в соответствии с ролью.          |
| 2       | Возможность создавать нового пользователя в системе с набором прав доступа.                                             |
| 3       | Возможность удаления пользователя.                                             |
| 4        | Возможность просматривать список товаров или один товар с остатками на складе с возможностью фильтрации по категориям и характеристикам товаров.  |
| 5        | Возможность добавлять новый товар на склад с указанием причины добавления и источника.                                 |
| 6        | Возможность удалять товар со склада с указанием причины убытия и направления убытия.                                   |
| 7        | Возможность обновлять характеристики товара на складе с указанием причины изменения.                                    |
| 8        | Возможность поиска товара на складе с использованием фильтрации по характеристикам товара.                             |
| 9        | Возможность изменять количество товара на складе с указанием причины изменения.                                        |

### Роли пользователей в системе

**Релиз 1**
_для учебных целей пропущена регистрация_

Ролевая модель **Роль: Администратор**
|  №UserReq | Описание   |
| :------------: | :------------: |
| 2 | Создание нового пользователя  |
| 3 | Удаление пользователя  |
| 5 | Добавление нового товара  |
| 6 | Удаление товара  |
| 7 | Обновление информации о товаре  |
| 9 | Изменение остатков на складе |

Ролевая модель **Роль: Начальник склада**
|  №UserReq | Описание   |
| :------------: | :------------: |
| 9 | Изменение остатков на складе |

Ролевая модель **Роль: общий доступ для всех зарегистированных сотрудников склада**
|  №UserReq | Описание   |
| :------------: | :------------: |
| 1 | Авторизация  |
| 4 | Получение списка товаров |
| 4 | Получение конкретного товара |
| 8  | Поиск товара с поисковыми параметрами фильтрации |

## Проектирование REST API
Процесс интеграции Клиент - Сервис:  
#### Разбиение на ресурсы (сущности) и методы работы с ними
**Управление ресурсом "Пользователи"**
1. Авторизация пользователя
2. Создание нового пользователя с набором ролей
5. Обновление информации о пользователе
6. Удаление пользователя
 
| **№** | **Path**                   | **Method** | **Body**  | **Response**              | **Description**                                |
|-------|----------------------------|------------|-----------|---------------------------|------------------------------------------------|
| 1     | /users                     | GET        | -         | Список пользователей      | Получить список всех пользователей             |
| 2     | /users/{id}                | GET        | -         | Информация о пользователе | Получить информацию о конкретном пользователе  |
| 3     | /users                     | POST       | User data | Новый пользователь        | Создать нового пользователя                    |
| 4     | /users/{id}                | PUT        | User data | Обновленный пользователь  | Обновить информацию о пользователе             |
| 5     | /users/{id}                | DELETE     | -         | -                         | Удалить пользователя                           |
| 6     | /users/{id}/roles          | GET        | -         | Список ролей пользователя | Получить список ролей пользователя             |
| 7     | /users/{id}/roles          | POST       | Role data | -                         | Добавить роль пользователю                     |
| 8     | /users/{id}/roles/{roleId} | DELETE     | -         | -                         | Удалить роль у пользователя                    |
| 9     | /login                     | POST       | User creds | Jwt token                | Аутентификация пользователя                    |

##### User data
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "User"
}
```

##### Role data
```json
{
  "name": "Admin",
  "description": "Administrator role with full access."
}
```

##### Response Список пользователей
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "User"
  },
  {
    "id": "2",
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "role": "Admin"
  }
]
```

##### Response Информация о пользователе
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "User"
}
```

##### Response Новый пользователь
```json
{
  "id": "3",
  "name": "Alice Smith",
  "email": "alicesmith@example.com",
  "role": "User"
}
```

##### Response Список ролей пользователя
```json
[
  {
    "id": "1",
    "name": "Admin",
    "description": "Administrator role with full access."
  },
  {
    "id": "2",
    "name": "User",
    "description": "Regular user role."
  }
]
```

##### User creds
```json
{
  "email": "johndoe@example.com",
  "password": "password123",
}
```

**Управление ресурсом "Товары на складе"**
1. Получение списка товаров
2. Получение информации о конкретном товаре
3. Создание нового товара
4. Обновление информации о товаре
5. Удаление товара
6. Поиск товара с поисковыми параметрами фильтрации
7. Изменение остатков на складе (отдельный метод на изменение количества товара на складе)
8. Получение остатка конкретного товара

|   | № | Path                 | Method | Body         | Response                     |
|---|---|----------------------|--------|--------------|------------------------------|
|   | 1 | /products            | GET    | -            | Список товаров               |
|   | 2 | /products/{id}       | GET    | -            | Информация о товаре          |
|   | 3 | /products            | POST   | Product data | Новый товар                  |
|   | 4 | /products/{id}       | PUT    | Product data | Обновленный товар            |
|   | 5 | /products/{id}       | DELETE | -            | -                            |
|   | 6 | /products/search     | GET    | -            | Список товаров               |
|   | 7 | /products/{id}/stock | PUT    | Stock data   | Измененный остаток товара    |
|   | 8 | /products/{id}/stock | GET    | -            | Информация об остатке товара |


##### Product data and Stock data
```javascript
Product data = {
    'name': str,
    'category': str,
    'description': str,
    'characteristics': dict
}

Stock data = {
    'quantity': int,
    'reason': str
}
```

##### Responses objects
```javascript
Список товаров = [
    {
        'id': int,
        'name': str,
        'category': str,
        'description': str,
        'characteristics': dict,
        'quantity': int
    },
    {...},
    {...}
]

Информация о товаре = {
    'id': int,
    'name': str,
    'category': str,
    'description': str,
    'characteristics': dict,
    'quantity': int
}

Новый товар = {
    'id': int,
    'name': str,
    'category': str,
    'description': str,
    'characteristics': dict,
    'quantity': int
}

Обновленный товар = {
    'id': int,
    'name': str,
    'category': str,
    'description': str,
    'characteristics': dict,
    'quantity': int
}

Измененный остаток товара = {
    'id': int,
    'quantity': int,
    'reason': str
}

Информация об остатке товара = {
    'id': int,
    'quantity': int
}

```

### Участники:
Работник склада - Администратор  
Работник склада - Работник: "Начальник склада"  
Система управления складом (бекенд)  

### HTTP ответы ресурса Пользователи
| **№** | **Путь**                   | **Метод** | **Код HTTP** | **Описание **                                    | **** |
|-------|----------------------------|-----------|--------------|--------------------------------------------------|------|
| 1     | /users                     | GET       | 200          | Список пользователей                             |      |
| 2     | /users                     | GET       | 404          | Пользователи не найдены в системе                |      |
| 3     | /users/{id}                | GET       | 200          | Информация о пользователе                        |      |
| 4     | /users/{id}                | GET       | 404          | Пользователь с указанным ID не найден в системе  |      |
| 5     | /users                     | POST      | 201          | Новый пользователь создан успешно                |      |
| 6     | /users                     | POST      | 400          | Некорректный запрос на создание пользователя     |      |
| 7     | /users                     | POST      | 409          | Пользователь с указанным email уже существует    |      |
| 8     | /users/{id}                | PUT       | 200          | Обновленная информация о пользователе            |      |
| 9     | /users/{id}                | PUT       | 400          | Некорректный запрос на обновление пользователя   |      |
| 10    | /users/{id}                | PUT       | 404          | Пользователь с указанным ID не найден в системе  |      |
| 11    | /users/{id}                | DELETE    | 204          | Пользователь удален успешно                      |      |
| 12    | /users/{id}                | DELETE    | 404          | Пользователь с указанным ID не найден в системе  |      |
| 13    | /users/{id}/roles          | GET       | 200          | Список ролей пользователя                        |      |
| 14    | /users/{id}/roles          | GET       | 404          | Пользователь с указанным ID не найден в системе  |      |
| 15    | /users/{id}/roles          | POST      | 201          | Роль успешно добавлена пользователю              |      |
| 16    | /users/{id}/roles          | POST      | 400          | Некорректный запрос на добавление роли           |      |
| 17    | /users/{id}/roles          | POST      | 404          | Пользователь с указанным ID не найден в системе  |      |
| 18    | /users/{id}/roles/{roleId} | DELETE    | 204          | Роль успешно удалена у пользователя              |      |
| 19    | /users/{id}/roles/{roleId} | DELETE    | 404          | Пользователь или роль не найдены в системе       |      |

Вариант 2
| **№** | **Path**                   | **Method** | **Successful HTTP code** | **Unsuccessful HTTP code** | **Description **                               |
|-------|----------------------------|------------|--------------------------|----------------------------|------------------------------------------------|
| 1     | /users                     | GET        | 200                      | 401, 403, 404              | Получить список всех пользователей             |
| 2     | /users/{id}                | GET        | 200                      | 401, 403, 404              | Получить информацию о конкретном пользователе  |
| 3     | /users                     | POST       | 201                      | 400, 401, 403              | Создать нового пользователя                    |
| 4     | /users/{id}                | PUT        | 200                      | 400, 401, 403, 404         | Обновить информацию о пользователе             |
| 5     | /users/{id}                | DELETE     | 204                      | 401, 403, 404              | Удалить пользователя                           |
| 6     | /users/{id}/roles          | GET        | 200                      | 401, 403, 404              | Получить список ролей пользователя             |
| 7     | /users/{id}/roles          | POST       | 201                      | 400, 401, 403, 404         | Добавить роль пользователю                     |
| 8     | /users/{id}/roles/{roleId} | DELETE     | 204                      | 401, 403, 404              | Удалить роль у пользователя                    |
| 9     | /login                     | POST       | 200                      | 400, 401                   | Аутентификация пользователя                    |


### HTTP ответы ресурса Продукты
| **№** | **Path**                 | **Method** | **Успешный HTTP-код** | **Неуспешный HTTP-код** | **Описание **                                 | **** |
|-------|--------------------------|------------|-----------------------|-------------------------|-----------------------------------------------|------|
| 1     | /products                | GET        | 200                   | 404                     | Получить список всех товаров                  |      |
| 2     | /products/{id}           | GET        | 200                   | 404                     | Получить информацию о товаре по ID            |      |
| 3     | /products                | POST       | 201                   | 400, 401, 500           | Создать новый товар                           |      |
| 4     | /products/{id}           | PUT        | 200                   | 400, 401, 404, 500      | Обновить информацию о товаре по ID            |      |
| 5     | /products/{id}           | DELETE     | 204                   | 401, 404, 500           | Удалить товар по ID                           |      |
| 6     | /products/{id}/stock     | GET        | 200                   | 404                     | Получить информацию об остатках товара по ID  |      |
| 7     | /products/{id}/stock     | POST       | 200                   | 400, 401, 404, 500      | Изменить остатки товара по ID                 |      |
| 8     | /products/{id}/stock     | PUT        | 200                   | 400, 401, 404, 500      | Обновить информацию об остатках товара по ID  |      |
| 9     | /products/{id}/stock     | DELETE     | 204                   | 401, 404, 500           | Удалить информацию об остатках товара по ID   |      |
| 10    | /products/{id}/thumbnail | PUT        | 200                   | 400, 401, 404, 500      | Загрузить изображение для товара по ID        |      |


#### Значение кодов ответов HTTP
| **№** | **Код ответа HTTP** | **Описание**                                                                                    | **Users_api**                                                                                  | **Products_api **                              |
|-------|---------------------|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------|
| 1 | 200                 | Успешный запрос, данные успешно возвращены                                                      | Получение списка пользователей, информации о пользователе, списка товаров, информации о товаре | Получение списка товаров, информации о товаре  |
| 2 | 201                 | Запрос успешно выполнен, новый ресурс был создан                                                | Создание нового пользователя, товара                                                           | Создание нового товара                         |
| 3 | 204                 | Успешный запрос, но нет данных для возврата                                                     | Обновление данных пользователя, товара                                                         | Обновление данных товара                       |
| 4 | 400                 | Ошибка запроса, запрос не может быть обработан сервером                                         | Некорректный запрос                                                                            | Некорректный запрос                            |
| 5 | 401                 | Ошибка авторизации, отсутствуют или некорректные авторизационные данные                         | Ошибка авторизации                                                                             | Ошибка авторизации                             |
| 6 | 403                 | Ошибка доступа, сервер понимает запрос, но отказывается его выполнять из-за ограничений доступа | Доступ запрещен                                                                                | Доступ запрещен                                |
| 7 | 404                 | Ошибка запроса, запрашиваемый ресурс не найден                                                  | Пользователь или ресурс не найден                                                              | Товар или ресурс не найден                     |
| 8 | 409                 | Ошибка конфликта, запрос не может быть обработан из-за конфликтующих данных                     | Дублирование существующего пользователя                                                        | Дублирование существующего товара              |
| 9 | 500                 | Ошибка сервера, запрос не может быть обработан из-за ошибки на стороне сервера                  | Ошибка на стороне сервера                                                                      | Ошибка на стороне се                           |




## Архитектура системы и проектное решение

- Пользовательский интерфейс
  - Представлен RESTful API на Node.js с использованием пакета express
- Middleware
  - Обрабатывает GET запроса по роуту /api/v1/weatherincity
  - Валидирует параметры запроса на наличие обязательного параметра `city`
- Controller
  - Использует маршрутизацию запросов с помощью пакета express
  - При получении запроса на /api/v1/weatherincity передает его в слой бизнес-логики
- Adapter
  - Обращается к API сервису https://openweathermap.org/api с помощью пакета axios
  - Передает параметры запроса в формате, необходимом для API сервиса с ключом API и названием города
- Бизнес-логика
  - Получает запрос от Controller и трансформирует его в формат, необходимый для API сервиса, добавляя к запросу ключ API и приводит название города к нужному формату.
  - Отправляет запрос к API сервису с помощью Adapter и получает ответ
  - Обрабатывает полученные данные, выбирая только необходимые поля и трансформируя их для передачи в ответ клиенту в формате json
- Exceprion handler
  - Обрабатывает ошибки, возникающие в Middleware, Controller и Business Logic.
  - Возврат пользователю ответа в едином формате с уведомлением об ошибке
  - Логирование ошибок для последующего анализа

## Проектирование модели предметной области
### Сущности Entities
|   |          |                                                                                                                                                                                           |
|---|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| № | Сущность | Описание                                                                                                                                                                                  |
| 1 | Users    | Таблица для хранения информации о пользователях, такой как логин, пароль, электронная почта, ФИО и другие атрибуты в зависимости от требований к системе.                                 |
| 2 | Roles    | Таблица для хранения информации о различных ролях пользователей в системе. Каждая роль может иметь уникальный идентификатор и набор разрешений для доступа к различным функциям системы.  |
| 3 | Products | Таблица для хранения информации о товарах, такой как название, описание, категория, характеристики, цена и другие атрибуты в зависимости от требований к системе.                         |
| 4 | Stock    | Таблица для хранения информации о наличии товаров на складе, такой как идентификатор товара, количество и причина изменения остатков на складе.                                           |

#### Users
| **1** | **Атрибут** | **Описание**                             |
|-------|-------------|-------------------------------------------|
| 2     | ID          | Уникальный идентификатор пользователя     |
| 3 | Login       | Логин пользователя для входа в систему    |
| 4 | Password    | Пароль пользователя для входа в систему   |
| 5 | Email       | Электронная почта пользователя для связи  |
| 6 | FullName    | Полное имя пользователя                   |
| 7 | RoleID      | Идентификатор роли пользователя в системе |

#### Roles 
| **1** | **Атрибут** | **Описание**                               |
|-------|-------------|---------------------------------------------|
| 2     | ID          | Уникальный идентификатор роли               |
| 3 | Name        | Название роли                               |
| 4 | Permissions | Список разрешений, связанных с данной ролью |

#### Products
| **1** | **Атрибут** | **Описание**                              |
|-------|-------------|--------------------------------------------|
| 2     | ID          | Уникальный идентификатор товара            |
| 3 | Name        | Название товара                            |
| 4 | Size_Length | Длина товара                               |
| 5 | Size_Height | Высота товара                              |
| 6 | Size_Width  | Ширина товара                              |
| 7 | Weight      | Вес товара                                 |
| 8 | Description | Описание товара                            |
| 9 | Price       | Цена товара                                |
| 10 | ActualDate  | Дата, на которую установлена цена на товар |

#### Stock
| **1** | **Атрибут** | **Описание**                              |
|-------|-------------|--------------------------------------------|
| 2     | ID          | Уникальный идентификатор записи на складе  |
| 3 | ProductID   | Идентификатор товара                       |
| 4 | Quantity    | Количество товара на складе                |
| 5     | Reason      | Причина изменения остатков на складе       |
| 6     | Date        | Дата изменения остатков на складе          |


## ER diagram Users and Products
```mermaid
erDiagram
    Users ||..o{ Roles : has
    Products }|--o{ Stock : located
```

## Физическая модель базы данных
```mermaid
erDiagram
    Users ||..o{ Roles : has
    Products }|--o{ Stock : located

    Stock {
        uuid ID
        string ProductID
        int Quantity
        string Reason
        date Date        
    }
    
    Products {
        uuid ID
        string Name
        string Description
        int Quantity
        float Price
        int CategoryID
        int SupplierID
    }

    Users {
        int ID
        string First_Name
        string Last_Name
        string Login
        string Password
        string Email
        int RoleID
    }
    
        Roles {
        int ID
        string RoleName
        string Permission
    }    
```

## Физическая модель данных для ORM Prisma NodeJS
```javascript
    model User {
      id         Int      @id @default(autoincrement())
      firstName  String
      lastName   String
      login      String   @unique
      password   String
      password   String
      email   String
      role       Role     @default(USER)
    }
      
    model Product {
      id          Int       @id @default(autoincrement())
      name        String
      description String?
      price       Float
      inventories Inventory[]
    }
    
    model Inventory {
      id         Int      @id @default(autoincrement())
      quantity   Int
      updateDate DateTime @default(now())
      productId  Int
      product    Product  @relation(fields: [productId], references: [id])
    }
     
    enum Role {
      ADMIN
      CLIENT
      EMPLOYEE
    }
```