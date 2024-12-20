# Setting Up Golekin Project Using Next.js with TypeScript

This documentation outlines the steps to set up a Next.js project using TypeScript.

## Prerequisites

- Latest version of Node.js (recommended: LTS)
- NPM or Yarn as the package manager

---

## Steps

### 1. Create a New Next.js Project

Run the following command to create a new Next.js project:

```bash
npx create-next-app@latest my-nextjs-app
```

You will be prompted to answer several setup questions. Choose the options that fit your requirements.

Alternatively, using Yarn:

```bash
yarn create next-app my-nextjs-app
```

### 2. Navigate to the Project Directory

Move into the newly created project directory:

```bash
cd my-nextjs-app
```

### 3. Add TypeScript

Install TypeScript and the necessary type definitions:

Using NPM:

```bash
npm install --save-dev typescript @types/react @types/node
```

Using Yarn:

```bash
yarn add --dev typescript @types/react @types/node
```

### 4. Generate the TypeScript Configuration File

Run the development server to automatically generate a `tsconfig.json` file:

```bash
npm run dev
```

If you are using Yarn:

```bash
yarn dev
```

The `tsconfig.json` file will be created at the root of your project. You can customize it as needed.

### 5. Convert JavaScript Files to TypeScript

Rename the following files to use TypeScript (`.tsx` extension):

- `pages/index.js` → `pages/index.tsx`
- Any other `.js` files should also be renamed to `.tsx`.

Make sure to update the code with proper TypeScript types where necessary.

### 6. Add Custom Type Definitions (Optional)

If your project requires additional type definitions, create a `global.d.ts` file in the `src` or root folder. For example:

```typescript
// global.d.ts
declare module "some-module" {
  const value: any;
  export default value;
}
```

### 7. Verify the Setup

Run the development server to verify that your setup works:

```bash
npm run dev
```

Visit `http://localhost:3000` to ensure the application runs correctly.

---

## Optional Enhancements

### Add ESLint and Prettier

To ensure consistent code formatting and linting, install ESLint and Prettier:

Using NPM:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

Using Yarn:

```bash
yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

Then, configure ESLint and Prettier in your project by creating `.eslintrc.json` and `prettier.config.js` files.

### Recommended Project Structure

Organize your project for better maintainability. This is our project structure:

```
└── 📁localmarket
    └── 📁.git  
    └── 📁public
        └── 📁icons
            └── icon-144x144.png
            └── icon-192x192.png
            └── icon-48x48.png
            └── icon-72x72.png
            └── icon-96x96.png
        └── 📁images
            └── driver_pinloc.png
            └── Golekin_logo.png
            └── user-polos.jpg
        └── favicon.ico
        └── favicon.png
        └── file.svg
        └── globe.svg
        └── manifest.json
        └── next.svg
        └── sw.js
        └── vercel.svg
        └── window.svg
        └── workbox-4754cb34.js
    └── 📁src
        └── 📁components
            └── 📁ui
                └── button.tsx
                └── card.tsx
                └── carousel.tsx
                └── category_carousel.module.css
                └── category_carousel.tsx
                └── categoryDropDown.tsx
                └── checkbox.tsx
                └── form.tsx
                └── home_topupBalance.tsx
                └── imageUploader.tsx
                └── input-otp.tsx
                └── input.tsx
                └── label.tsx
                └── navbar.tsx
                └── promotionDetails.tsx
                └── searchBar.tsx
                └── select.tsx
                └── setDeliveryLocation.tsx
                └── slider.tsx
                └── textarea.tsx
                └── topUpBalance.tsx
                └── updateDescription.tsx
            └── MapComponent.tsx
            └── ProtectedRoute.tsx
            └── reviewForm.tsx
        └── 📁context
            └── UserContext.tsx
        └── 📁lib
            └── utils.ts
        └── 📁pages
            └── 📁admin
                └── index.tsx
            └── 📁agen
                └── index.tsx
            └── 📁api
                └── hello.ts
            └── 📁cartpage
                └── index.tsx
            └── 📁category
                └── [id].tsx
                └── category_grid.module.css
            └── 📁driver
                └── index.tsx
            └── 📁edit_product
                └── [id].tsx
            └── 📁edit_promotion
                └── [promotionId].tsx
            └── 📁fonts
                └── GeistMonoVF.woff
                └── GeistVF.woff
            └── 📁home
                └── category_list.module.css
                └── category_list.tsx
                └── index.tsx
                └── market_list.module.css
                └── market_list.tsx
                └── product_grid.module.css
                └── product_grid.tsx
            └── 📁input_product
                └── index.tsx
            └── 📁input_promotion
                └── index.tsx
                └── promotionList.tsx
            └── 📁list_product
                └── index.tsx
            └── 📁login
                └── index.tsx
            └── 📁market_product
                └── [marketId].tsx
                └── market_product_grid.module.css
            └── 📁product
                └── [id].tsx
            └── 📁profile
                └── index.tsx
            └── 📁register
                └── index.tsx
            └── 📁topUpBalance
                └── index.tsx
            └── 📁transaction
                └── index.tsx
            └── 📁transaction_detail
                └── [id].tsx
            └── 📁transaction_list
                └── index.tsx
            └── _app.tsx
            └── _document.tsx
            └── 401.tsx
            └── 404.tsx
            └── index.tsx
        └── 📁services
            └── authService.ts
            └── productService.ts
        └── 📁styles
            └── globals.css
        └── 📁utils
            └── inputProductStyle.ts
            └── listProductStyles.ts
            └── loginStyles.ts
            └── registerStyles.ts
    └── .env
    └── .env.local
    └── .eslintrc.json
    └── .gitignore
    └── components.json
    └── netlify.toml
    └── next-env.d.ts
    └── next.config.ts
    └── package-lock.json
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.ts
    └── tsconfig.json
```

---

## Example Code

Below is an example of a simple `index.tsx` file with TypeScript:

```typescript
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Next.js with TypeScript!</h1>
    </div>
  );
};

export default Home;
```

---

## Resources

- [Next.js Official Documentation](https://nextjs.org/docs)
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Configuration](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)

---

