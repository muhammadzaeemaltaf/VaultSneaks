export const schemaTypes = [
    {
      name: "products",
      type: "document",
      title: "Products",
      fields: [
        { name: "productId", type: "number", title: "Product ID" },
        { name: "name", type: "string", title: "Name" },
        { name: "price", type: "number", title: "Price", options: { precision: 2 } },
        { name: "stock", type: "number", title: "Stock" },
        { name: "category", type: "string", title: "Category" },
        { name: "tags", type: "array", title: "Tags", of: [{ type: "string" }] },
        { name: "description", type: "text", title: "Description" },
        { name: "images", type: "array", title: "Images", of: [{ type: "image" }] },
        { name: "brand", type: "string", title: "Brand" },
        { name: "size", type: "array", title: "Size", of: [{ type: "string" }] },
        { name: "color", type: "array", title: "Color", of: [{ type: "string" }] },
      ],
    },
    {
      name: "orders",
      type: "document",
      title: "Orders",
      fields: [
        { name: "orderId", type: "number", title: "Order ID" },
        { name: "customerId", type: "number", title: "Customer ID" },
        { name: "status", type: "string", title: "Status" },
        { name: "timestamp", type: "datetime", title: "Timestamp" },
        { name: "totalAmount", type: "number", title: "Total Amount", options: { precision: 2 } },
      ],
    },
    {
      name: "order_products",
      type: "document",
      title: "Order Products",
      fields: [
        { name: "orderId", type: "number", title: "Order ID" },
        { name: "productId", type: "number", title: "Product ID" },
        { name: "quantity", type: "number", title: "Quantity" },
      ],
    },
    {
      name: "customers",
      type: "document",
      title: "Customers",
      fields: [
        { name: "customerId", type: "number", title: "Customer ID" },
        { name: "name", type: "string", title: "Name" },
        { name: "contactInfo", type: "string", title: "Contact Info" },
        { name: "address", type: "text", title: "Address" },
      ],
    },
    {
      name: "shipments",
      type: "document",
      title: "Shipments",
      fields: [
        { name: "shipmentId", type: "number", title: "Shipment ID" },
        { name: "orderId", type: "number", title: "Order ID" },
        { name: "status", type: "string", title: "Status" },
        { name: "deliveryDate", type: "datetime", title: "Delivery Date" },
        { name: "trackingNumber", type: "string", title: "Tracking Number" },
      ],
    },
    {
      name: "payments",
      type: "document",
      title: "Payments",
      fields: [
        { name: "paymentId", type: "number", title: "Payment ID" },
        { name: "orderId", type: "number", title: "Order ID" },
        { name: "amount", type: "number", title: "Amount", options: { precision: 2 } },
        { name: "status", type: "string", title: "Status" },
        { name: "paymentMethod", type: "string", title: "Payment Method" },
      ],
    },
    {
      name: "delivery_zones",
      type: "document",
      title: "Delivery Zones",
      fields: [
        { name: "zoneId", type: "number", title: "Zone ID" },
        { name: "zoneName", type: "string", title: "Zone Name" },
        { name: "coverageArea", type: "array", title: "Coverage Area", of: [{ type: "text" }] },
        { name: "assignedDrivers", type: "array", title: "Assigned Drivers", of: [{ type: "text" }] },
      ],
    },
  ];
  