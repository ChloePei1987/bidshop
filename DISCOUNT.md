## Discount Feature Proposal (Bonus Task)

### 1. Clarifying Questions

Before starting, I would clarify the following:

- Does the 10% discount apply to the subtotal before tax and shipping?
- Is the discount applied automatically or via a promo code?
- Can multiple discounts be combined?
- Should the discount be visible in the UI before checkout?

---

### 2. Required Changes

#### Backend (API)

- Update order calculation logic to apply a 10% discount when subtotal > $100
- Ensure the discount is included in the API response
- Extend the order model to include:
  - `discount`

#### Frontend (UI)

- Display the discount in the cart or checkout page
- Show updated total after discount is applied
- Clearly indicate when the discount is triggered

#### Data Model

- Since the app uses in-memory data, update the order structure to include discount-related fields

---

### 3. Test Strategy

#### API Tests

- Verify discount is applied when subtotal > $100
- Verify no discount is applied when subtotal ≤ $100
- Verify final total is calculated correctly
- Verify edge case (e.g. exactly $100)

#### UI Tests

- Verify discount is displayed when applicable
- Verify total price updates correctly in the UI
- Verify no discount is shown below the threshold
- Verify discount is shown above the threshold

---

### 4. Regression / Safety Checks

- Ensure existing order flow still works
- Validate cart and order behaviour are unaffected
- Run existing API and UI tests to confirm no regressions

---

### 5. Before Shipping

- Add tests for pricing logic (unit or integration level)
- Validate edge cases (e.g. rounding, boundary values)
- Ensure UI messaging is clear for users
- Confirm consistent behaviour between frontend and backend