<h1 align="center">Исходная формулировка задания</h1>
#### Задание 4-1-calc. Сервис Калькулятор.

##### Исходная формулировка задания:
  Разработать простейщий калькулятор (сложение, вычитание, умножение, деление). Входные данные получить из строки запуска в терминале
node calc arg1 arg2 operation, где arg1, arg2 - аргументы для калькулятора, operation - требуемая операция.
Сделать минимальный набор проверок входных аргументов на соответствие числовому типу данных (без граничных условий).
Требования к реализации - разделить на модули: основной модуль и модуль математических функций.

Функционал: сложение, вычитание, умножение и деление.
Вызов справки:node calc.js help.

<h1>Спецификация требований</h1>

#### Функциональные требования:
Функциональные требования к калькулятору могут быть определены как следующие:

Калькулятор должен иметь возможность выполнять базовые математические операции, такие как сложение, вычитание, умножение и деление.
Калькулятор должен иметь возможность обрабатывать отрицательные и десятичные числа.
Калькулятор должен иметь возможность сохранять результат предыдущих вычислений и использовать его в следующих вычислениях.
Калькулятор должен иметь возможность очистки текущего результата и начала нового вычисления.
Калькулятор должен обрабатывать ошибки пользовательского ввода и сообщать пользователю об этих ошибках.
Калькулятор должен поддерживать изменение операции по умолчанию.
Калькулятор должен иметь возможность работать на разных устройствах с разными размерами экрана и разрешением.
Также можно дополнить требования дополнительными функциональностями, такими как сохранение истории вычислений, поддержка научной нотации, поддержка ввода переменных и другие.

#### НФТ:
Нефункциональные требования — это описание требований, которые не связаны напрямую с функциональностью приложения, но которые важны для его эффективной и безопасной работы. Некоторые примеры нефункциональных требований для простого калькулятора могут включать в себя:

Производительность: калькулятор должен быть быстрым и отзывчивым, чтобы пользователь мог быстро выполнять вычисления без задержек.

Надежность: калькулятор должен быть надежным и стабильным, чтобы пользователи могли полагаться на его работу.

Безопасность: калькулятор не должен позволять вводить некорректные данные, и должен быть защищен от злонамеренных пользователей.

Поддержка различных форматов: калькулятор должен поддерживать различные форматы чисел, такие как целые числа и числа с плавающей запятой.
Производительность: калькулятор должен быстро и точно выполнять вычисления даже при большом объеме входных данных.

Надежность: калькулятор должен быть стабильным и не должен выдавать неверные результаты или ошибки.

Безопасность: калькулятор должен защищать от возможных атак, таких как инъекция SQL или ввод некорректных данных, которые могут привести к ошибкам.

Пользовательский интерфейс: калькулятор должен иметь понятный и простой пользовательский интерфейс, который позволяет легко вводить данные и получать результаты. Интерфейс также должен быть эргономичным и удобным в использовании.

Масштабируемость: калькулятор должен быть способен масштабироваться и добавлять новые функции и операции без изменения основного кода. Это позволит легко обновлять и расширять функциональность калькулятора в будущем.

#### User story:
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

#### Use case:
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

#### SRS:

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

#### Sequence diagram (plantUML)

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

Software Requirements Specification
1. Introduction
1.1 Purpose
The purpose of this document is to specify the requirements for a simple CLI calculator that can perform basic arithmetic operations.

1.2 Scope
The calculator will be a command line interface (CLI) application that performs the following operations:

Addition
Subtraction
Multiplication
Division
1.3 Definitions, Acronyms, and Abbreviations
N/A

1.4 References
N/A

2. Overall Description
2.1 Product Perspective
The calculator will be a standalone CLI application that performs arithmetic operations.

2.2 Product Features
The calculator will be able to perform the following operations:

Addition
Subtraction
Multiplication
Division
2.3 User Classes and Characteristics
The calculator is designed for anyone who needs to perform basic arithmetic operations.

2.4 Operating Environment
The calculator will run on the command line of any modern operating system that supports Node.js.

2.5 Design and Implementation Constraints
The calculator will be implemented in JavaScript using Node.js.

2.6 User Documentation
User documentation will be provided in the form of a README file.

2.7 Assumptions and Dependencies
The calculator assumes that the user has basic knowledge of the command line and can navigate to the directory where the calculator is located.

3. System Features
3.1 Feature 1: Addition
3.1.1 Description
The calculator should be able to perform addition of two numbers.

3.1.2 Inputs
The user will input two numbers to be added.

3.1.3 Outputs
The calculator will output the result of the addition.

3.1.4 Exceptions
N/A

3.2 Feature 2: Subtraction
3.2.1 Description
The calculator should be able to perform subtraction of two numbers.

3.2.2 Inputs
The user will input two numbers to be subtracted.

3.2.3 Outputs
The calculator will output the result of the subtraction.

3.2.4 Exceptions
N/A

3.3 Feature 3: Multiplication
3.3.1 Description
The calculator should be able to perform multiplication of two numbers.

3.3.2 Inputs
The user will input two numbers to be multiplied.

3.3.3 Outputs
The calculator will output the result of the multiplication.

3.3.4 Exceptions
N/A

3.4 Feature 4: Division
3.4.1 Description
The calculator should be able to perform division of two numbers.

3.4.2 Inputs
The user will input two numbers to be divided.

3.4.3 Outputs
The calculator will output the result of the division.

3.4.4 Exceptions
The calculator will throw an error if the second number is zero.
4. Non-Functional Requirements
4.1 Performance Requirements
The calculator should perform all operations in a timely manner.

4.2 Security Requirements
N/A

4.3 Software Quality Attributes
The code should be well-documented and maintainable.
The code should be tested thoroughly.
5. Appendices
N/A
