# System Documentation

## **System Architecture**

This project is a **Server-Side Rendered (SSR) React Application** built with the following components:

1. **Frontend**:

   - Built using **React**.
   - Dynamically renders banners and elements based on JSON data fetched from an API.
   - Uses `hydrateRoot` for client-side hydration after server-side rendering.

2. **Backend**:

   - Built using **Express.js**.
   - Fetches JSON data from an external API (`process.env.API_URL`) and passes it to the React app for rendering.
   - Uses `react-dom/server`'s `renderToString` to generate HTML on the server.

3. **Build System**:

   - **Webpack** is used for bundling both the client and server code.
   - Separate configurations for client (`webpack.config.client.js`) and server (`webpack.config.server.js`).
   - TypeScript is used for type safety and modern JavaScript features.

4. **Environment Configuration**:
   - Environment variables are managed using the `dotenv` package.
   - .env file contains sensitive information like the API URL.

---

## **Setup Procedures**

### **1. Prerequisites**

- Node.js (v18 or later)
- npm
- A .env file with the following content:
  ```
  API_URL=replace_with_the_api_url
  ```

### **2. Installation**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd creatopy-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```bash
   touch .env
   ```
   Add the following content:
   ```
   API_URL=replace_with_the_api_url
   ```

### **3. Build the Project**

- Build the server:
  ```bash
  npm run build:server
  ```
- Build the client:
  ```bash
  npm run build:client
  ```

### **4. Run the Server**

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`.

---

## **Usage Instructions**

### **1. Accessing the Application**

- Navigate to `http://localhost:3000/<hash>` where `<hash>` is the unique identifier for the design.
- The server will fetch the JSON data for the design from the API and render it dynamically.

### **2. Rendering Logic**

- **Background**: The `renderBackground` function dynamically renders the background based on the `backgroundColor` property.
- **Elements**: The `renderElements` function iterates through the `elements` array and renders each element (e.g., images, text, buttons) with the appropriate styles.

---

## **Features Implemented**

### **1. Server-Side Rendering (SSR)**

- **Why**: Improves SEO and reduces the time to first render by pre-rendering HTML on the server.
- **How**: Used `react-dom/server`'s `renderToString` to generate HTML on the server.

### **2. Dynamic Banner Rendering**

- **Why**: Allows the application to render banners dynamically based on JSON data.
- **How**: Implemented `renderBackground` and `renderElements` functions to handle different background types and elements.

### **3. Environment Configuration**

- **Why**: Keeps sensitive information (e.g., API URLs) out of the source code.
- **How**: Used the `dotenv` package to load environment variables from a .env file.

### **4. Modular Build System**

- **Why**: Separates client and server builds for better maintainability.
- **How**: Created separate Webpack configurations for the client and server.

---

## **Challenges Faced**

### **1. Debugging SSR Issues**

- **Problem**: Debugging SSR issues was difficult because errors in the server-rendered React components were not visible in the browser.
- **Solution**: Added detailed logging on the server and used borders for visual debugging.

---

## **What I Would Do Differently**

### **1. Improve Error Handling**

- Add more robust error handling for API requests and rendering logic to provide better feedback to the user.

### **2. Optimize Performance**

- Implement caching for API responses to reduce redundant network requests.
- Use `renderToPipeableStream` (React 18) for streaming SSR to improve performance.

### **3. Enhance Styling**

- Use a CSS-in-JS library (e.g., Styled Components) or a CSS preprocessor (e.g., SCSS) for better styling management.

### **4. Add Unit Tests**

- Write unit tests for critical functions like `renderBackground` and `renderElements` to ensure reliability.

### 5. Make atomic React components

- Break down the UI into smaller, reusable React components.
- Ensure each component handles a single responsibility (e.g., `Background`, `TextElement`, `ImageElement`).
- Use props and context to manage data flow between components.
- Write Storybook stories for each component to visualize and test them in isolation.
- Optimize components for performance by using `React.memo` where applicable.
- Implement accessibility features (e.g., ARIA attributes) for better usability.
- Document each component with clear usage examples and expected props.