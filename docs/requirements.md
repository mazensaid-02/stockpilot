# StockPilot — Product Requirements

## 1. Product Overview

StockPilot is a web-based inventory management system designed for
small and medium-sized businesses.

It helps businesses manage products, categories, suppliers, stock levels,
purchase orders, and inventory activity through a centralized application.

## 2. Product Goals

- Maintain accurate inventory information.
- Simplify product and supplier management.
- Track every stock change.
- Manage purchasing workflows.
- Provide visibility into inventory activity.
- Enforce secure, role-based access.

## 3. User Roles

### Admin
- Manage users and roles.
- Create, update, and archive products.
- Manage categories and suppliers.
- Manage purchase orders.
- Perform inventory operations.
- View dashboard and inventory history.

### Staff
- View products and suppliers.
- Perform authorized inventory operations.
- View relevant inventory activity.
- Access only the features permitted by their role.

All permissions must be enforced by the backend API.

## 4. Functional Requirements

### 4.1 Authentication and Users
- Users can log in and log out.
- The application exposes the currently authenticated user.
- Admins can manage users.
- Access is controlled by user roles and permissions.

### 4.2 Dashboard
Display:
- Total number of active products.
- Current stock value.
- Low-stock product alerts.
- Recent inventory movements.

### 4.3 Products
- Create and update products.
- Archive products.
- Search and filter products.
- Associate products with categories.
- Assign each product a unique SKU.
- Configure a minimum stock threshold.

### 4.4 Categories
- Create and update categories.
- View products belonging to a category.
- Prevent invalid category references.

### 4.5 Suppliers
- Create and update suppliers.
- View supplier information.
- Associate suppliers with purchase orders.

### 4.6 Inventory Management
Support three inventory movement types:
- Stock in: increase available stock.
- Stock out: decrease available stock.
- Adjustment: correct the recorded stock quantity.

Every movement must record:
- Product.
- Movement type.
- Quantity.
- User responsible.
- Date and time.
- Reason or description.

### 4.7 Purchase Orders
- Create purchase orders for suppliers.
- Add products and quantities.
- Track order status.
- Receive purchase orders.
- Update inventory when an order is received.
- Prevent an order from being received more than once.

### 4.8 Inventory History
- Display inventory movements.
- Identify who performed each operation.
- Record when the operation happened.
- Preserve the history of stock changes.

## 5. Business Rules

1. Every product must have a unique SKU.
2. Stock quantities cannot become negative.
3. Every stock change must create an inventory movement.
4. Receiving a purchase order must update inventory.
5. A purchase order cannot be received twice.
6. Critical inventory operations must be transactional.
7. Backend authorization must protect restricted operations.
8. Products with inventory history should be archived rather than permanently deleted.
9. Product information updates must not directly modify stock quantities.

## 6. Non-Functional Requirements

### Security
- Hash passwords securely.
- Protect authenticated endpoints.
- Enforce authorization on the backend.
- Validate incoming data.
- Avoid exposing secrets in source code.
- Use secure authentication cookies.

### Reliability
- Use database transactions for critical operations.
- Preserve inventory history.
- Handle errors consistently.

### Maintainability
- Use TypeScript.
- Organize backend code by business module.
- Separate business logic from HTTP handling.
- Provide automated tests.
- Maintain API documentation.

### Usability
- Provide a clear and responsive web interface.
- Make common inventory operations easy to perform.
- Display useful validation and error messages.

## 7. MVP Scope

The initial version includes:
- Authentication and user roles.
- Dashboard.
- Products and categories.
- Suppliers.
- Inventory movements.
- Purchase orders and receiving.
- Inventory history.

## 8. Out of Scope

The initial version will not include:
- Multiple warehouse management.
- Barcode scanning.
- Accounting and invoicing.
- Real payment processing.
- Native mobile applications.
- Microservices.
- AI-powered features.

These features may be considered in future versions.

## 9. Success Criteria

The MVP is considered functional when:
- Users can authenticate securely.
- Authorized users can manage products and suppliers.
- Inventory operations update stock correctly.
- Invalid operations are rejected.
- Every stock change is auditable.
- Purchase order receiving updates stock exactly once.
- The dashboard displays accurate inventory information.
- Critical workflows are covered by automated tests.
