# Лог изменений в Kwery

краткое описание доработок:
- На фронт добавлена новая страница для ввода нового типа Cron джоба обеспечивающий массовую рассылку заказов на менеджеров. Краткос суть, джоб принимает два SQL запроса, первый возвращает почтовые адреса менеджеров и заказы к исполнению. Второй запрос содержит детальные сведения о заказе. На стороне бекенда доработан контроллер, DTO, DAO, job, email service (изза изменения формы отчета вынес для нового джоба в свой сервис), добавлен в обработчик новый тип джоба, после массовой рассылки добавлен report remover. Так же с фронта до бека прокинута новая настройка для указания типа десятичного разделителя. 

дорабатываемый код: https://github.com/kwery/kwery

## 1. Frontend:

root directory for web - src/main/java/assets/js/components
- [ ] Добавить новую форму в формате HTML и связать данные через `data-bind="value: variable"`
- [ ] Добавить в JS-файл для связывания переменных с пользовательским интерфейсом (ko.observable)
- [ ] Добавить новые данные в request body. Сверить с объектом Dto на API контроллере
- [ ] Использовать для хранения сообщений `messages.properties`
- [ ] Зарегистрировать новый компонент (new_page.html + new_page.js) в `startup.js` require: "components/path/to/new_page" (путь к js файлу)
- [ ] В js файле привязать путь к разметке html (define([..."text!components/broadcast/add.html"...])
- [ ] Зарегистировать url-маршрут к новой странице в `repo-dash.js` {url: "broadcast/add", auth: false, component: "broadcast-add"}

**Технологии:** Knockout.js

## 2. Backend:

- [ ] Разработать и создать модель сущности для БД с аннотацией @Entity
- [ ] Создать SQL-скрипт миграции
- [ ] Создать новый DAO класс
- [ ] Создать или обновить DTO для нового или обновленного endpoint

### Контроллеры:

- [ ] Зарегистировать маршрутизацию в файле `Routes.java` (пример: `router.POST().route(BROADCAST_JOB_SAVE_API).with(BroadcastApiController.class, "saveBroadcastJob")`)
- [ ] Обновить API-контроллеры

### Обработка отчетов (email sender)

- [ ] Обновить или создать новый `CsvToReportEmailSectionConverter` для приведения отчетов к нужному виду (создается через фабрику)
- [ ] Обновить или создать новый отправитель почты `BroadcastReportEmailSender`
- [ ] Обновить или создать в resources файл разметки письма `broadcastReport.html`, привязать к текущему контексту `kweryMail.setBodyHtml(templateEngine.process("broadcastReport", context));`

**Технологии:** ninja.Router

## 3. Database & Architecture:

- [ ] Рефакторинг базы данных (вынести логику БД из классов задач) - исследовать **User session limit**

## 4. Task Handling & Scheduling:

- [ ] Создать новый Task и Task Factory.
- [ ] Привязать Task Factory в конфигурации модуля (bind).
- [ ] Обновить проверки на task instance `SchedulerListenerImpl`.
- [ ] Обновить task instance `TaskExecutorListener`.
- [ ] Создать новый Service для планирования новой задачи в Cron4j
- [ ] Создать структуру данных для регистра нового типа задач чтобы отличать их от стандартных задач Kwery и управлять визуализацией.

## 5. Тестирование & Деплой (пока не знаю как делать):

- [ ] Написать юнит-тесты для новой функциональности. хер
- [ ] Провести интеграционное тестирование. хер
- [ ] Развернуть изменения на стейджинговой/продукционной среде и мониторить производительность. хер

## Изменения в существующий код Kwery:

### **TaskExecutorListenerImpl**:

Добавлено ветвление для отправки кастомного отчета:
```java
Boolean reportEmailSent = false;
// Broadcast section start
if (isBroadcastTask) {
    broadcastReportEmailSender.send(jobExecutionModel); // broadcast task always has email
    reportEmailSent = true; // flag for Broadcast service
    
};
// Broadcast section end
```

Добавлено ветвление для обработки завершения нового типа задачи Broadcast tasks
```java
// Broadcast section start
...} else if (task instanceof BroadcastTask) {
BroadcastTask broadcastTask = (BroadcastTask) task;
logger.info("Задача Broadcast завершилась. Next launch from cron expression");
// broadcastService.deschedule(broadcastTask.getJobId());
// logger.info("Задача Broadcast deschedule - for launch Broadcast needs recreate job");
//            
} // Broadcast section end
else {...}
```
В этом блоке можно управлять удалением или повторным запуском задачи, пока что на уровне хардкода.

### **SchedulerListenerImpl**:

дополнено ветвление для логирования запуска, успешного выполнения или ошибки нового типа задачи BroadcastTask
```java
} else if (task instanceof BroadcastTask) {
    logger.info("Запуск задачи рассылки SQL получателям");
}

} else if (task instanceof BroadcastTask) {
    logger.info("Задача рассылки SQL получателям успешно завершена");
} else {

} else if (task instanceof BroadcastTask) {
    logger.error("Ошибка при выполнении задачи рассылки SQL получателям", exception);
} 
```

### **JobApiController** в метод **listJobs**:

Убираем из общего списка задач, задачи на массовую рассылку, чтобы не "загромождать" просмотр существующих задач
```java
// Отфильтровываем задания, чтобы оставить только не-зарегистрированные Broadcast
jobs = jobs.stream()
    .filter(job -> !broadcastService.isBroadcastTaskRegistered(job.getId()))
    .collect(Collectors.toList());
// end Broadcast section
```

### **nav-bar.html**:

Добавлены выпадающие пункты Broadcast list и add

---

## Изменения, связанные с десятичным разделителем

### Фронтенд

#### Обновление компонента `add.html` and `add.js`

```javascript
var Query = function(query, queryTitle, queryLabel, datasourceId, id, emailSettingId, includeInBody, includeAsAttachment, singleResultStyling, querySeparator, digitalSeparator) {
    this.query = query;
    this.queryLabel = queryLabel;
    // ... другие свойства
    this.digitalSeparator = digitalSeparator;
};

if (!isUpdate) {
    var query = new Query();
    query.querySeparator = ',';
    query.digitalSeparator = ',';
    // ... настройки по умолчанию
    self.queries.push(query);
}
```

#### Функция API запроса

```javascript
// Псевдокод для обращения к API с новыми параметрами
var query = new Query(sqlQuery.query, sqlQuery.title, sqlQuery.label, sqlQuery.datasource.id, sqlQueryId,
emailSettingId, includeInBody, includeAsAttachment, singleResultStyling, sqlQuery.separator, sqlQuery.digitalSeparator);
// ... остальная часть функции
```

### Бэкенд

#### API Контроллеры

Изменения в `BroadcastApiController.java` и `JobApiController.java`:

```java
public SqlQueryModel sqlQueryDtoToSqlQueryModel(SqlQueryDto dto) {
    model.setDigitalSeparator(dto.getDigitalSeparator());
    // ... другие преобразования
}
```

#### Миграция базы данных

```sql
alter table sql_query add column digital_separator CHAR default ',';
```

#### Обновление классов

В `SqlQueryDto` и `SqlQueryModel`:

```java
// В SqlQueryDto
@NotNull
@Size(min = 1, max = 2)
private char digitalSeparator;

// В SqlQueryModel
public static final String DIGITAL_SEPARATOR = "digital_separator";
```

### Обработка данных

#### KweryResultSetHelperService

Метод `formatNumericValue` в `KweryResultSetHelperService`:

```java
private String formatNumericValue(Number number) {
    if (number == null) {
        return "";
    }
    DecimalFormat decimalFormat = new DecimalFormat();
    decimalFormat.setMaximumFractionDigits(2);
    decimalFormat.setGroupingUsed(false);
    DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.ENGLISH);
    symbols.setDecimalSeparator(this.digitalSeparator);
    decimalFormat.setDecimalFormatSymbols(symbols);

    return decimalFormat.format(number);
}
```

#### CsvWriterFactoryImpl

В `CsvWriterFactoryImpl`:

```java
@Override
public CSVWriter create(Writer writer, char separator, char digitalSeparator) {
    CSVWriter csvWriter = new CSVWriter(writer, separator, DEFAULT_QUOTE_CHARACTER, DEFAULT_ESCAPE_CHARACTER, System.lineSeparator());
    csvWriter.setResultService(new KweryResultSetHelperService(digitalSeparator));
    return csvWriter;
}
```

#### Интеграция в `ResultSetToCsvWriter`

```java
public void write() throws SQLException, IOException {
    // ... код для инициализации FileWriter и BufferedWriter
    CSVWriter csvWriter = csvWriterFactory.create(printWriter, separator, digitalSeparator);
    csvWriter.writeAll(resultSet, true);
    // ... остальная логика метода
}
```

#### Применение в `SqlQueryTask`

```java
Future<ResultSet> queryFuture = preparedStatementExecutorFactory.create(p).executeSelect();
try (ResultSet rs = queryFuture.get()) {
    File file = kweryDirectory.createFile();
    resultSetProcessorFactory.create(rs, file, sqlQuery.getSeparator(), sqlQuery.getDigitalSeparator()).write();
    // ... сохранение информации об исполнении запроса
}
```

---
Вам нужно добавить информацию о новой функции "JobFilesRemover" в файл `readme.md`. Вот пример того, как это можно сделать:

---

## JobFilesRemover: Удаление старых файлов исполнения задач

### Описание

Новая функция `JobFilesRemover` добавлена в бэкенд приложения. Этот компонент отвечает за удаление файлов, связанных с выполнением задач, которые были созданы более четырех дней назад. Это предотвращает накопление устаревших файлов и освобождает место на диске.

### Интеграция в Scheduler

`JobFilesRemover` интегрирован в `SchedulerListenerImpl`, чтобы автоматически проверять и удалять старые файлы исполнения задач при запуске каждой задачи.

```java
@Singleton
public class SchedulerListenerImpl implements SchedulerListener {
    // ... предыдущий код ...

    protected final JobFilesRemover jobFilesRemover;

    @Inject
    public SchedulerListenerImpl(/* ... параметры ... */, JobFilesRemover jobFilesRemover) {
        // ... инициализация ...
        this.jobFilesRemover = jobFilesRemover;
    }

    @Override
    public void taskLaunching(TaskExecutor executor) {
        // ... код обработки других задач ...

        if (task instanceof JobTask) {
            // ... код ...
            jobFilesRemover.checkAndRemoveOldFiles(jobModel.getId());
        }
    }
}
```

### Реализация `JobFilesRemover`

Функция `checkAndRemoveOldFiles` в классе `JobFilesRemover` проверяет каждую исполненную задачу и удаляет связанные с ней файлы, если дата их последнего изменения превышает установленный срок (четыре дня).

```java
@Singleton
public class JobFilesRemover {
    // ... код класса ...

    public void checkAndRemoveOldFiles(int jobId) {
        // ... реализация ...
    }
};
```
