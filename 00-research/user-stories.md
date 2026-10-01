# User stories

1. As a user, I want to calculate the amount of calories in a dish or a specific product.
2. As a user, I want to find a recipe for a dish that is suitable for me.

## Story 1: Calorie calculation

**As a** user, **I want to** calculate the number of calories in a dish or a specific product, **so that** I can control my diet.

Acceptance criteria:

- Search for a product/dish by name, with autocomplete from the database
- Specify weight/portion (grams, ml, "1 piece", "1 cup", etc.)
- Display calories along with macros (protein/fat/carbs)
- Manual entry if a product isn't in the database (calories/macros per 100 g)
- Sum calories across multiple ingredients for complex dishes
- Save a product/dish to a diary or favorites
- Barcode scanning support for packaged products

## Story 2: Recipe discovery

**As a** user, **I want to** find a recipe for a dish that's suitable for me, **so that** I can eat according to my goals and restrictions.

Acceptance criteria:

- Filters: calorie range, diet type, allergies/intolerances, available ingredients
- Two discovery paths: browsing a curated catalog, and building from ingredients on hand
- Recipe detail: ingredients, steps, macros per serving, prep time
- Save to favorites, add directly to the diary
- Personalization based on profile (weight, goal, activity level)
- A calorie limit can be set for a specific dish; the app rescales ingredient quantities to fit it
