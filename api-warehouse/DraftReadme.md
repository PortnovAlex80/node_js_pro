### Диаграмма классов

```mermaid
classDiagram
    class User{
        +uuid ID
        +string FirstName
        +string LastName
        +string Login
        +string Password
        +string Email
        +uuid RoleID
        +Login()
        +Logout()
        +ChangePassword(oldPassword, newPassword)
        +GetAllUsers()
    }
    
    class Role{
        +uuid ID
        +string RoleName
        +string Permission
        +AssignPermission(permission)
        +RemovePermission(permission)
        +Role.GetAllRoles()
    }
    
    class StockOperation{
        +uuid ID
        +uuid UserID
        +date Date
        +string OperationType
        +ExecuteOperation()
        +CancelOperation()
        +GetAllOperations()
    }
    
    class Product{
        +uuid ID
        +string Name
        +string Description
        +int inStock
        +float Price
        +AddStock(quantity)
        +RemoveStock(quantity)
        +UpdatePrice(newPrice)
        +GetAllProducts()
    }
    
    class OperationComposition{
        +uuid ID
        +uuid StockOperationID
        +uuid ProductID
        +int Quantity
        +AddProduct(productID, quantity)
        +RemoveProduct(productID)
    }

    User "0..*" -- "1" Role : has
    User "1" -- "0..*" StockOperation : operation
    StockOperation "1" -- "0..*" OperationComposition : has
    Product "1" -- "0..*" OperationComposition : composed_of

```
