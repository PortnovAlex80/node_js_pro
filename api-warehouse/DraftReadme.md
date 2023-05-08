### Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    UserList ||--o{ User : has
    User }o--|| Role : has
    
    Role }o--|| RoleList : has
    
    User {
        int ID
        string FirstName
        string LastName
        string Login
        string Password
        string Email
        int Role
    }
    
    Role {
        int ID
        string RoleName
        string Permission
    }
    
    User ||--o{ StockOperation : operation
    Product ||--o{ OperationComposition : composed_of
    
    StockOperation {
        uuid ID
        int UserID
        date Date
        string OperationType
    }
    
    Product {
        uuid ID
        string Name
        string Description
        int Quantity
        float Price
    }
    
    OperationComposition {
        uuid ID
        uuid StockOperationID
        uuid ProductID
        int Quantity
    }
	  
	Product }o--|| ProductList: grouped_by

    StockOperation }o--|| StockOperationList : has
    StockOperation ||--|{ OperationComposition : has
```
