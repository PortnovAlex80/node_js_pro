<h4 align="center">NodeJS backend basic</h4>
<h1 align="center">Исходная формулировка задания</h1>
<h2 align="center">Задание 4-1-calc</h2>
<h2 align="center">Сервис Калькулятор-CLI</h2>

##### Исходная формулировка задания:
  Разработать простейщий калькулятор (сложение, вычитание, умножение, деление). Входные данные получить из строки запуска в терминале
node calc arg1 arg2 operation, где arg1, arg2 - аргументы для калькулятора, operation - требуемая операция.

Сделать минимальный набор проверок входных аргументов на соответствие числовому типу данных (без граничных условий).
Требования к реализации - разделить на модули: основной модуль и модуль математических функций.
Язык разработки: JavaScript. NodeJS.

Функционал: сложение, вычитание, умножение и деление.
Вызов справки:node calc.js help.

<h1 align="center">Спецификация требований</h1>
<h2 align="center">Функциональные требования</h2>

Функциональные требования к калькулятору могут быть определены как следующие:

1. Калькулятор должен иметь возможность выполнять базовые математические операции, такие как сложение, вычитание, умножение и деление.
2. Калькулятор должен иметь возможность обрабатывать отрицательные и десятичные числа.
3. Калькулятор должен иметь возможность сохранять результат предыдущих вычислений и использовать его в следующих вычислениях.
4. Калькулятор должен иметь возможность очистки текущего результата и начала нового вычисления.
5. Калькулятор должен обрабатывать ошибки пользовательского ввода и сообщать пользователю об этих ошибках.
6. Калькулятор должен поддерживать изменение операции по умолчанию.
7. Калькулятор должен иметь возможность работать на разных устройствах с разными размерами экрана и разрешением.
8. Также можно дополнить требования дополнительными функциональностями, такими как сохранение истории вычислений, поддержка научной нотации, поддержка ввода переменных и другие.

<h2 align="center">Нефункциональные требования</h2>
Нефункциональные требования — это описание требований, которые не связаны напрямую с функциональностью приложения, но которые важны для его эффективной и безопасной работы. Некоторые примеры нефункциональных требований для простого калькулятора могут включать в себя:

**Производительность**: калькулятор должен быть быстрым и отзывчивым, чтобы пользователь мог быстро выполнять вычисления без задержек. Скорость расчета не должна превышать 5 секунд. Если превышает, то вывести оповещение о трудоемкости вычисления и предложить или продолжить или остановить вычисления.

**Надежность**: калькулятор должен быть надежным и стабильным, чтобы пользователи могли полагаться на его работу.

**Безопасность**: калькулятор не должен позволять вводить некорректные данные, и должен быть защищен от злонамеренных пользователей.

**Поддержка различных форматов**: калькулятор должен поддерживать различные форматы чисел, такие как целые числа и числа с плавающей запятой.
**Производительность**: калькулятор должен быстро и точно выполнять вычисления даже при большом объеме входных данных.

**Надежность**: калькулятор должен быть стабильным и не должен выдавать неверные результаты или ошибки.

**Безопасность**: калькулятор должен защищать от возможных атак, таких как инъекция SQL или ввод некорректных данных, которые могут привести к ошибкам.

**Пользовательский интерфейс**: калькулятор должен иметь понятный и простой пользовательский интерфейс, который позволяет легко вводить данные и получать результаты. Интерфейс также должен быть эргономичным и удобным в использовании. Поэтому удобнее CLI клиента нет. Использовать лучшие решения для командной строки.

**Масштабируемость:** калькулятор должен быть способен масштабироваться и добавлять новые функции и операции без изменения основного кода. Это позволит легко обновлять и расширять функциональность калькулятора в будущем.

<h2 align="center">User story</h2>
Некоторые из основных User story для простейшего калькулятора могут быть:

Как пользователь, я хочу иметь возможность вводить числа и операции для выполнения математических вычислений.
Как пользователь, я хочу иметь возможность видеть результат вычислений после каждой операции.
Как пользователь, я хочу иметь возможность выполнить последовательность операций, а не только одну операцию за раз.
Как пользователь, я хочу иметь возможность очистить результат вычислений и начать заново.
Как пользователь, я хочу иметь возможность получать ошибку, если ввод не является числом или если происходит попытка деления на ноль.
Как пользователь, я хочу иметь возможность использовать клавиатуру для ввода чисел и операций.
Как пользователь, я хочу иметь возможность сохранить результат вычислений для последующего использования.
Как пользователь, я хочу иметь возможность выбирать из разных режимов калькулятора (например, простой, научный, финансовый и т.д.) с соответствующими функциями и возможностями.

Эти User story могут быть использованы в качестве основы для разработки функциональности простейшего калькулятора. Конечно, могут быть добавлены и другие требования в зависимости от конкретных потребностей и целей разработки.

<h2 align="center">Use case</h2>
Основной Use Case для калькулятора с альтернативными сценариями может выглядеть следующим образом:

Название: Выполнение математических операций в калькуляторе

Основной поток:

Пользователь вводит число и выбирает математическую операцию (+, -, *, /).
Пользователь вводит второе число.
Калькулятор вычисляет результат операции.
Калькулятор выводит результат на экран.
Альтернативный сценарий 1:

2а. При вводе числа пользователь допускает ошибку (например, вводит букву вместо числа).
2б. Калькулятор сообщает об ошибке и просит пользователя повторить ввод числа.
Альтернативный сценарий 2:

3а. При выполнении операции калькулятор выдает ошибку деления на ноль.
3б. Калькулятор сообщает об ошибке и просит пользователя изменить ввод.
Альтернативный сценарий 3:

1а. Пользователь вводит некорректный символ для математической операции.
1б. Калькулятор сообщает об ошибке и просит пользователя повторить ввод операции.

<h2 align="center">SRS</h2>

Введение
1.1 Цель документа
1.2 Аудитория
1.3 Область применения
1.4 Определения, сокращения и акронимы
Обзор
2.1 Требования к продукту
2.2 Функциональность продукта
2.3 Характеристики пользователей
2.4 Ограничения и зависимости
Требования
3.1 Требования к функциональности
3.1.1 Ввод данных
3.1.2 Выполнение операций
3.1.3 Отображение результата
3.1.4 Обработка ошибок
3.2 Требования к производительности
3.2.1 Время отклика
3.2.2 Расход памяти
3.3 Требования к надежности
3.3.1 Ошибки и исключения
3.3.2 Восстановление после сбоев
3.4 Требования к безопасности
3.5 Требования к мобильности
3.6 Требования к удобству использования
3.6.1 Интерфейс пользователя
3.6.2 Управление данными
Планирование тестирования
4.1 Критерии приемочного тестирования
4.2 План тестирования
Структура документации
5.1 Список использованных источников
5.2 Приложения (если есть)

<h2 align="center">Sequence diagram (plantUML)</h2>

@startuml
actor User
participant Calculator
User -> Calculator : enters two numbers to divide
Calculator -> Calculator : check if second number is 0
Calculator -> Calculator : throw DivideByZeroError if second number is 0
Calculator -> Calculator : perform division operation
Calculator -> Calculator : return result of division
Calculator -> User : display result
@enduml

## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
User ->> Calculator:  enters two numbers to divide
Calculator-->>Calculator: check if second number is 0
Calculator-->>Calculator: throw DivideByZeroError if second number is 0
Calculator -> Calculator : perform division operation
Calculator -> Calculator : return result of division
Calculator -> User : display result
Note right of User: This is simple example.

```

```mermaid
graph TD;
    A[Enter First Number] --> B[Enter Second Number];
    B --> C{Select Operation};
    C -->|Addition| D[Add Two Numbers];
    C -->|Subtraction| E[Subtract Two Numbers];
    C -->|Multiplication| F[Multiply Two Numbers];
    C -->|Division| G[Divide Two Numbers];
    G -->|Divisor = 0| H[Error: Cannot Divide by Zero];
    G -->|Divisor != 0| I[Divide Two Numbers];
    D --> J[Display Result];
    E --> J;
    F --> J;
    I --> J;
    H --> J;

```

## Software Requirements Specification

### 1. Введение

#### 1.1. Назначение

Целью данного проекта является разработка простого калькулятора для командной строки, который поддерживает основные арифметические операции.

#### 1.2. Бизнес требования

- Калькулятор должен быть доступен в командной строке.
- Калькулятор должен поддерживать основные арифметические операции: сложение, вычитание, умножение, деление.
- Калькулятор должен быть легко расширяемым для поддержки новых операций.

### 2. Требования пользователя

#### 2.1. Программные интерфейсы

Калькулятор должен быть разработан как консольное приложение, использующее встроенный интерфейс командной строки.

#### 2.2. Характеристики пользователей

Калькулятор предназначен для использования программистами и другими специалистами, работающими в командной строке.

#### 2.3. Цели использования

Цель использования калькулятора - выполнение арифметических вычислений в командной строке.

#### 2.4. Ограничения

- Калькулятор должен поддерживать только целочисленные вычисления.
- Калькулятор не должен поддерживать вычисления с плавающей запятой.

## 3. Требования к ПО

### 3.1 Функциональные требования

- Пользователь может вводить числа и операторы
- Пользователь может просмотреть результат операции
- Пользователь может очистить историю операций
- Пользователь может выбрать операцию из списка доступных операций (сложение, вычитание, умножение, деление)

### 3.2 Нефункциональные требования

- Приложение должно работать на платформах Windows, macOS и Linux
- Приложение должно иметь простой и интуитивно понятный интерфейс
- Приложение должно работать быстро и без задержек
- Приложение должно корректно обрабатывать ошибки ввода данных и сообщать пользователю об ошибках
- Приложение должно иметь возможность локализации

### 3.3 Требования к интерфейсу

Приложение должно иметь следующие элементы управления:

- Поле ввода для чисел и операторов
- Кнопки для выбора операции
- Кнопка для очистки истории операций
- Поле для вывода результатов операции
- Список доступных операций

### 3.4 Ограничения

- Приложение не должно быть использовано для выполнения критически важных задач
- Приложение не должно использоваться вместо профессионального калькулятора при решении сложных математических задач
- Приложение не должно использоваться для обработки больших объемов данных

### 3.5 Требования к производительности

- Приложение должно работать быстро и без задержек при вводе и выводе данных
- Приложение не должно занимать большой объем оперативной памяти

### 3.6 Требования к надежности

- Приложение должно корректно обрабатывать ошибки ввода данных и сообщать пользователю об ошибках
- Приложение должно работать без сбоев и неожиданных завершений

### 3.7 Требования к безопасности

- Приложение не должно представлять угрозу для безопасности пользователей и их данных
- Приложение должно обеспечивать защиту данных пользователя

### 3.8 Требования к технической поддержке

- Приложение должно иметь документацию для пользователей
- Приложение должно иметь поддержку на форуме разработчиков или службе поддержки
- Приложение должно иметь возможность автоматического обновления



