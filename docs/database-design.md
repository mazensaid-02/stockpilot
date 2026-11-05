# StockPilot — Database Design

## 1. Overview

StockPilot uses PostgreSQL as its relational database and Prisma ORM
for database access and schema management.

The initial database model contains seven core entities:

1. User
2. Category
3. Product
4. Supplier
5. InventoryMovement
6. PurchaseOrder
7. PurchaseOrderItem

The model supports product management, inventory tracking, supplier
management, purchase orders, and inventory auditing.

## 2. Entities

### 2.1 User

Stores application users and their access information.

Fields:
- id
- name
- email
- passwordHash
- role
- createdAt
- updatedAt

Roles:
- ADMIN
- STAFF

Rules:
- Email must be unique.

### 2.2 Category

Groups products into categories.

Fields:
- id
- name
- description
- createdAt
- updatedAt

Rules:
- Category names must be unique.

### 2.3 Product

Stores product information and current inventory.

Fields:
- id
- sku
- name
- description
- unitCost
- currentStock
- minimumStock
- categoryId
- isArchived
- createdAt
- updatedAt

Rules:
- SKU must be unique.
- Stock quantities must be non-negative integers.
- Minimum stock must be a non-negative integer.
- New products start with a currentStock of zero.
- Initial stock must be added through a dedicated inventory operation.
- Product stock cannot be modified directly through general product
  update operations.
- Products with inventory history must be archived rather than deleted.

### 2.4 Supplier

Stores supplier contact information.

Fields:
- id
- name
- email
- phone
- address
- createdAt
- updatedAt

Rules:
- A supplier can have multiple purchase orders.

### 2.5 InventoryMovement

Records every change to product inventory.

Fields:
- id
- productId
- userId
- type
- quantityChange
- stockAfter
- reason
- createdAt

Movement types:
- IN
- OUT
- ADJUSTMENT

Rules:
- quantityChange is signed and cannot be zero.
- IN movements must have a positive quantity change.
- OUT movements must have a negative quantity change.
- ADJUSTMENT movements can be positive or negative.
- stockAfter records the resulting stock quantity and cannot be negative.
- Each movement references a product and the responsible user.
- Every stock change must generate an inventory movement.
- Movements are historical records and must not be silently modified
  or deleted.

### 2.6 PurchaseOrder

Represents an order placed with a supplier.

Fields:
- id
- supplierId
- createdById
- status
- createdAt
- updatedAt
- receivedAt

Statuses:
- DRAFT
- ORDERED
- RECEIVED
- CANCELLED

Rules:
- A purchase order belongs to one supplier.
- A purchase order is created by one user.
- Only an ORDERED purchase order can be received.
- Receiving an order updates all its products and creates inventory
  movements in one database transaction.
- Receiving the same order twice must be rejected.
- A purchase order must contain at least one item before it can be
  changed from DRAFT to ORDERED.

Allowed status transitions:

| Current status | Allowed next status |
|---|---|
| DRAFT | ORDERED, CANCELLED |
| ORDERED | RECEIVED, CANCELLED |
| RECEIVED | None |
| CANCELLED | None |

### 2.7 PurchaseOrderItem

Represents a product included in a purchase order.

Fields:
- id
- purchaseOrderId
- productId
- orderedQuantity
- unitCost

Rules:
- Ordered quantity must be a positive integer.
- Unit cost is stored as a decimal monetary value.
- Unit cost is a snapshot of the price at order creation.
- Each item references one purchase order and one product.
- The combination of purchaseOrderId and productId must be unique.
- A product should appear only once per purchase order; additional
  quantities should update the existing item.

## 3. Relationships

- Category has many Products.
- Product belongs to one Category.
- Product has many InventoryMovements.
- User has many InventoryMovements.
- Supplier has many PurchaseOrders.
- User has many PurchaseOrders.
- PurchaseOrder has many PurchaseOrderItems.
- Product has many PurchaseOrderItems.

## 4. Data Types

| Data | Database type |
|---|---|
| IDs | UUID |
| Names and descriptions | String / Text |
| Email | String |
| Password hash | String |
| Role and status | Enum |
| Inventory quantities | Integer |
| Monetary values | Decimal(12,3) |
| Timestamps | Timestamp |

The initial application uses one configurable currency.
Monetary values must support three decimal places to accommodate
currencies such as the Tunisian dinar.

## 5. Inventory Integrity

All stock changes must go through dedicated inventory operations.

An inventory operation must:

1. Validate the requested quantity.
2. Verify the user's permissions.
3. Read and validate the current stock.
4. Calculate the resulting stock.
5. Reject operations that would produce negative stock.
6. Update Product.currentStock.
7. Create an InventoryMovement record.

Additional integrity rules:

- Stock quantities must remain non-negative integers.
- Inventory movement quantities cannot be zero.
- IN movements must increase stock.
- OUT movements must decrease stock.
- ADJUSTMENT movements can increase or decrease stock.
- The stockAfter value must reflect the actual resulting stock.

The product update and movement creation must occur in the same
database transaction.

Concurrent inventory operations must be handled safely to prevent
lost updates and incorrect stock quantities.

## 6. Purchase Order Receiving

The initial MVP supports receiving an entire purchase order at once.
Partial receiving is out of scope.

Receiving must:

1. Verify that the purchase order exists.
2. Verify that its status is ORDERED.
3. Retrieve all purchase order items.
4. Increase the stock of every referenced product.
5. Create one IN inventory movement for every item.
6. Update the purchase order status to RECEIVED.
7. Set receivedAt.

All operations must execute in one database transaction.

If any operation fails, all changes must roll back.

The operation must also prevent concurrent or repeated receiving
of the same purchase order.

## 7. Deletion and Data Retention

- Products with inventory history must be archived.
- Inventory movements must be preserved.
- Purchase orders with historical activity must be preserved.
- Related records must not be deleted through cascading behavior
  that would destroy business history.
- Records referenced by historical inventory movements or purchase
  orders must not be physically deleted.

## 8. Future Improvements

The following features are intentionally excluded from the initial
database model:

- Multiple warehouses.
- Decimal inventory quantities and unit conversions.
- Partial purchase order receiving.
- Customer and sales management.
- Barcode management.

They may be introduced when future business requirements justify them.