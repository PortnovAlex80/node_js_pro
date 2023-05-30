 @startuml
2 !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml
3
4 skinparam wrapWidth 300
5 LAYOUT_WITH_LEGEND()
6 LAYOUT_LANDSCAPE()
7
8 title
9   <b>FeedbackPublicationArch v2022.05.26</b>
10  <i>Система обратной связи: публикация</i>
11 end title
12
13 System_Boundary(ok, "Одноклассники") {
14   System_Ext(ok_mobile, "Мобильный сайт")
15 }
16
17 System_Boundary(vk, "Вконтакте") {
18   System_Ext(ok_official_api, "Официальный API")
19 }
20
21 Person(operator, "Оператор")
22   
23 System_Boundary(message_processing_system, "Система обработки сообщений") {
24  Container(amo_adapter, "Адаптер AMO CRM", "Python 3.10, FastAPI", "Получение данных для публикации от AMO CRM и постановка публикаций в очередь")
25  Container(feedback, "Форма обратной связи", "Python 3.8, Django 3, React", "Формирование ответов на сообщение, постановка ответов в очередь")
26  SystemQueue(response_queue, "Kafka", "Ответы для публикации")
27  Container(vk_publsher, "VK Publisher", "Python", "Публикация ответов в ВК")
28  Container(ok_publsher, "OK Publisher", "Java, Selenium", "Публикация ответов в Одноклассники")
29  
30  Rel(feedback, response_queue, "Сохраняет", "kafka")
31  Rel(vk_publsher, response_queue, "Потребляет", "kafka")
32  Rel(ok_publsher, response_queue, "Потребляет", "kafka")
33  Rel(operator, feedback, "Отвечает на сообщение", "Внутренний REST API")
34 }
35
36 System_Ext(amo, "AMO CRM", "Просмотр заявок и отправка ответов")
37 System_Ext(email, "Email")
38 Person_Ext(amo_operator, "Оператор AMO CRM")
39
40 Rel(amo_operator, amo, "Отвечает на заявки")
41 Rel(amo, email, "Отправка сообщений на Email")
42 Rel_U(amo, amo_adapter, "Отправка сообщений в ОК и ВК")
43
44 Rel_L(vk_publsher, ok_official_api, "Публикация", "HTTP")
45 Rel_L(ok_publsher, ok_mobile, "Публикация", "HTTP")
46 @enduml
