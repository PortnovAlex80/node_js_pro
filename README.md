```plantuml
!includeurl https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

![PlantUML model](http://www.plantuml.com/plantuml/png/skinparam wrapWidth 200
skinparam maxMessageSize 200

LAYOUT_TOP_DOWN()
LAYOUT_WITH_LEGEND()

Person(customer, Покупатель, "Совершает покупки")

System_Boundary(shop_boundary, "Shop") {
Person(manager, Менеджер, "Управляет интернет магазином")
Person(courier, Курьер, "Доставляет заказ")

' Shop
System(shop, "Shop", "Интернет магазин")
Rel_D(customer, shop, "Делает покупки")
Rel_L(manager, shop, "Управляет магазином")
Rel(shop, courier, "Назначает заказ")

' Auth
System_Ext(auth, "Auth", "Сервер аутентификации")
Rel_L(shop, auth, "Использует")
Rel_L(customer, auth, "Авторизуется")
})


skinparam wrapWidth 200
skinparam maxMessageSize 200

LAYOUT_TOP_DOWN()
LAYOUT_WITH_LEGEND()

Person(customer, Покупатель, "Совершает покупки")

System_Boundary(shop_boundary, "Shop") {
Person(manager, Менеджер, "Управляет интернет магазином")
Person(courier, Курьер, "Доставляет заказ")

' Shop
System(shop, "Shop", "Интернет магазин")
Rel_D(customer, shop, "Делает покупки")
Rel_L(manager, shop, "Управляет магазином")
Rel(shop, courier, "Назначает заказ")

' Auth
System_Ext(auth, "Auth", "Сервер аутентификации")
Rel_L(shop, auth, "Использует")
Rel_L(customer, auth, "Авторизуется")
}
```
