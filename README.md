![your-UML-diagram-name](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/PortnovAlex80/node_js_pro/developer/umldia.iuml)

@startuml Basic Sample
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(admin, "Administrator")
System_Boundary(c1, "Sample System") {
    Container(web_app, "Web Application", "C#, ASP.NET Core 2.1 MVC", "Allows users to compare multiple Twitter timelines")
}
System(twitter, "Twitter")

Rel(admin, web_app, "Uses", "HTTPS")
Rel(web_app, twitter, "Gets tweets from", "HTTPS")
@enduml

The background color is `#ffffff` for light mode and `#000000` for dark mode.

`rgb(9, 105, 218)`ЦВЕТ 

<details>
<summary>Tips for collapsed sections</summary>

### You can add a header

You can add text within a collapsed section. 

You can add an image or a code block, too.

```ruby
   puts "Hello World"
```

</details>

@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

System_Boundary(WMSystem, "Warehouse managment system") {
    Container(WMS, "Склад", "Technology", "Склад")
}

System_Boundary(Users, "Пользователи") {
    Person(MGR, "Менеджер склада")
    Person(EMPLOYEE, "Работник склада")
    Person(ADMIN, "Администратор")
}

System_Boundary(Context, "Смежные системы") {
    System(DELIVERY, "Служба доставки")
    System(INTERNET_SHOP, "Интернет-магазин")
}

Rel(MGR, WMS, "Каталог товаров")
Rel(WMS, MGR, "Каталог товаров,\nИнформация об остатках,\nОтчет по складским операциям")

Rel(EMPLOYEE, WMS, "Складские операции")
Rel(WMS, EMPLOYEE, "Каталог товаров,\nТоварная накладная, Заказ на сборку")

Rel(ADMIN, WMS, "Данные:\nПользователи,\nГруппы доступа")
Rel(WMS, ADMIN, "Отчет о пользователях")

Rel(WMS, INTERNET_SHOP, "Информация о наличии товара")
Rel_U(INTERNET_SHOP, DELIVERY, "Заказы Клиентов")
Rel(DELIVERY, WMS, "Заявка на сборку заказа")
Rel(WMS, DELIVERY, "График и место погрузки")

@enduml

