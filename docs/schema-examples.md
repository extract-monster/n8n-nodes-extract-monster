# JSON Schema Examples

This document provides ready-to-use JSON schema examples for common data extraction scenarios.

## Business Documents

### Invoice
```json
{
  "invoice_number": {"type": "string", "description": "Invoice or receipt number"},
  "invoice_date": {"type": "string", "description": "Date of invoice"},
  "due_date": {"type": "string", "description": "Payment due date"},
  "vendor_name": {"type": "string", "description": "Name of vendor or company"},
  "vendor_address": {"type": "string", "description": "Vendor address"},
  "customer_name": {"type": "string", "description": "Customer or client name"},
  "subtotal": {"type": "number", "description": "Subtotal amount"},
  "tax": {"type": "number", "description": "Tax amount"},
  "total": {"type": "number", "description": "Total amount"},
  "currency": {"type": "string", "description": "Currency code (USD, EUR, etc)"},
  "line_items": {
    "type": "array",
    "description": "List of items or services",
    "items": {
      "type": "object",
      "properties": {
        "description": {"type": "string"},
        "quantity": {"type": "number"},
        "unit_price": {"type": "number"},
        "total": {"type": "number"}
      }
    }
  }
}
```

### Purchase Order
```json
{
  "po_number": {"type": "string"},
  "date": {"type": "string"},
  "supplier": {"type": "string"},
  "buyer": {"type": "string"},
  "shipping_address": {"type": "string"},
  "items": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "item_code": {"type": "string"},
        "description": {"type": "string"},
        "quantity": {"type": "number"},
        "unit_price": {"type": "number"}
      }
    }
  },
  "total_amount": {"type": "number"}
}
```

### Receipt
```json
{
  "merchant_name": {"type": "string"},
  "merchant_address": {"type": "string"},
  "date": {"type": "string"},
  "time": {"type": "string"},
  "transaction_id": {"type": "string"},
  "payment_method": {"type": "string"},
  "subtotal": {"type": "number"},
  "tax": {"type": "number"},
  "tip": {"type": "number"},
  "total": {"type": "number"}
}
```

## Identity Documents

### Driver License
```json
{
  "license_number": {"type": "string"},
  "full_name": {"type": "string"},
  "date_of_birth": {"type": "string"},
  "issue_date": {"type": "string"},
  "expiration_date": {"type": "string"},
  "address": {"type": "string"},
  "state": {"type": "string"},
  "class": {"type": "string"}
}
```

### Passport
```json
{
  "passport_number": {"type": "string"},
  "surname": {"type": "string"},
  "given_names": {"type": "string"},
  "nationality": {"type": "string"},
  "date_of_birth": {"type": "string"},
  "place_of_birth": {"type": "string"},
  "gender": {"type": "string"},
  "issue_date": {"type": "string"},
  "expiration_date": {"type": "string"},
  "issuing_country": {"type": "string"}
}
```

## Contact Information

### Business Card
```json
{
  "name": {"type": "string"},
  "title": {"type": "string"},
  "company": {"type": "string"},
  "email": {"type": "string"},
  "phone": {"type": "string"},
  "mobile": {"type": "string"},
  "website": {"type": "string"},
  "address": {"type": "string"}
}
```

### Contact Form
```json
{
  "first_name": {"type": "string"},
  "last_name": {"type": "string"},
  "email": {"type": "string"},
  "phone": {"type": "string"},
  "company": {"type": "string"},
  "job_title": {"type": "string"},
  "message": {"type": "string"}
}
```

## Medical Documents

### Lab Report
```json
{
  "patient_name": {"type": "string"},
  "date_of_birth": {"type": "string"},
  "patient_id": {"type": "string"},
  "test_date": {"type": "string"},
  "test_name": {"type": "string"},
  "results": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "test_name": {"type": "string"},
        "value": {"type": "string"},
        "unit": {"type": "string"},
        "reference_range": {"type": "string"},
        "status": {"type": "string"}
      }
    }
  }
}
```

### Prescription
```json
{
  "patient_name": {"type": "string"},
  "patient_dob": {"type": "string"},
  "doctor_name": {"type": "string"},
  "date": {"type": "string"},
  "medications": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "medication_name": {"type": "string"},
        "dosage": {"type": "string"},
        "frequency": {"type": "string"},
        "duration": {"type": "string"},
        "instructions": {"type": "string"}
      }
    }
  }
}
```

## Legal Documents

### Contract Key Terms
```json
{
  "contract_title": {"type": "string"},
  "contract_date": {"type": "string"},
  "parties": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "name": {"type": "string"},
        "role": {"type": "string"}
      }
    }
  },
  "effective_date": {"type": "string"},
  "expiration_date": {"type": "string"},
  "contract_value": {"type": "number"},
  "payment_terms": {"type": "string"},
  "termination_clause": {"type": "string"}
}
```

## Financial Documents

### Bank Statement
```json
{
  "account_holder": {"type": "string"},
  "account_number": {"type": "string"},
  "statement_period": {"type": "string"},
  "opening_balance": {"type": "number"},
  "closing_balance": {"type": "number"},
  "transactions": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "date": {"type": "string"},
        "description": {"type": "string"},
        "amount": {"type": "number"},
        "type": {"type": "string"}
      }
    }
  }
}
```

### Pay Stub
```json
{
  "employee_name": {"type": "string"},
  "employee_id": {"type": "string"},
  "pay_period": {"type": "string"},
  "pay_date": {"type": "string"},
  "gross_pay": {"type": "number"},
  "net_pay": {"type": "number"},
  "deductions": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "type": {"type": "string"},
        "amount": {"type": "number"}
      }
    }
  },
  "year_to_date_gross": {"type": "number"},
  "year_to_date_net": {"type": "number"}
}
```

## Real Estate

### Property Listing
```json
{
  "address": {"type": "string"},
  "city": {"type": "string"},
  "state": {"type": "string"},
  "zip_code": {"type": "string"},
  "price": {"type": "number"},
  "bedrooms": {"type": "number"},
  "bathrooms": {"type": "number"},
  "square_feet": {"type": "number"},
  "lot_size": {"type": "string"},
  "year_built": {"type": "number"},
  "property_type": {"type": "string"},
  "description": {"type": "string"}
}
```

## Shipping & Logistics

### Shipping Label
```json
{
  "tracking_number": {"type": "string"},
  "carrier": {"type": "string"},
  "service_type": {"type": "string"},
  "sender_name": {"type": "string"},
  "sender_address": {"type": "string"},
  "recipient_name": {"type": "string"},
  "recipient_address": {"type": "string"},
  "weight": {"type": "string"},
  "ship_date": {"type": "string"},
  "delivery_date": {"type": "string"}
}
```

## Tips for Creating Your Own Schemas

1. **Be Specific**: Use descriptive field names
2. **Use Correct Types**: `string`, `number`, `boolean`, `array`, `object`
3. **Add Descriptions**: Help the AI understand what to extract
4. **Start Simple**: Test basic schemas first, then add complexity
5. **Use Arrays**: For repeating data (line items, transactions, etc.)
6. **Nest Objects**: For complex hierarchical data

## Testing Your Schema

1. Start with a small, simple schema
2. Test with sample documents
3. Refine based on results
4. Add more fields gradually
5. Validate output format

## Need Help?

If you need help creating a custom schema:
- Check our [API documentation](https://extract.monster/docs/developers/custom-schemas)
- Contact support@extract.monster
- See more examples at extract.monster/docs/examples
