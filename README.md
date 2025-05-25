# 💄 MAKEUP E2E Tests with Playwright

This project contains automated end-to-end tests for https://makeup.com.ua/ua/ using Playwright and TypeScript. 
The tests cover various aspects of the online store functionality, including filters, brand search, 
cart validation, order info, and more.


## 📁 Project Structure
```
src/
├── data/                 # Constants and test data
│   └── constants.ts
├── fixtures/             # Playwright fixtures setup
│   ├── fixturePages.ts
│   └── index.ts
├── pages/                # Page Object Models
├── utils/                # Helpers and utilities
tests/                    # All test spec files
```

## ✅ Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/en/download) (>= 16.5.0)
- npm (comes with Node.js)
- Git (optional, for version control)

### 📦 Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/igorkireiv/TestProject.git
cd test-project
npm install
```

### ▶️ How to run tests
Please, find quick start guide by the link: https://playwright.dev/docs/running-tests

| Script                       | Description                         |
|------------------------------| ----------------------------------- |
| `npx playwright test`        | Runs all Playwright tests           |
| `npx playwright test:ui`     | Runs tests using Playwright Test UI |
| `npx playwright report`      | Opens the Playwright HTML report    |
| `npx playwright test:headed` | Runs tests with a visible browser   |

### 🧬 Environment Variables

Create a .env file in the root directory to store environment-specific values (e.g., base URL, credentials):
* BASE_URL="https://makeup.com.ua/ua/"
* USER_NAME=
* SURNAME=
* PASSWORD=
* EMAIL=
* PHONE=
* BIRTHDATE=


## 🔧 Technologies
* TypeScript
* Playwright
* Node.js

## 🧪 Coverage
* Product filtering
* Brand search
* Cart validation
* Product details
* Checkout form
* Filter randomization
