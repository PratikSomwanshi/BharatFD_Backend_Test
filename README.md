# FAQ Express Backend

This project provides a backend API for managing multilingual FAQs using **Node.js**, **Express.js**, and **Prisma ORM**. The API supports language translation, caching with Redis, and WYSIWYG editor integration. The goal is to provide an efficient and flexible solution for handling FAQs in multiple languages.

---

## Table of Contents

1. [Installation Steps](#installation-steps)
2. [API Usage Examples](#api-usage-examples)
3. [Environment Variables](#environment-variables)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Testing](#testing)

---

## Installation Steps

To get started with this project, follow the steps below:

### 1. Clone the Repository

```bash
git clone https://github.com/PratikSomwanshi/BharatFD_Backend_Test.git
cd faq_express
```
### 2. Install Dependencies

To install the required dependencies for your project, run the following command:

```bash
npm install
```

### 3. Set Up Environment Variables

1. Create a `.env` file in the root directory of your project.

2. Add the following configurations in the `.env` file:

    ```bash
    DATABASE_URL="mysql://root:yourpassword@localhost:3306/faq"
    REDIS_URL="redis://localhost:6379"
    RAPID_API_TRANSLATE_KEY="your-rapid-api-key"
    RAPID_API_TRANSLATE_HOST="rapidapi-url"
    ```

3. Ensure that both your MySQL and Redis servers are running.

    - MySQL should be accessible at `localhost:3306`.
    - Redis should be accessible at `localhost:6379`.


### 4. Migrate Database

 1) Run the following command to apply the database migrations:

    ```bash
    npx prisma migrate dev
    ```

### 5. Start the Application

1. To start the server, use the following command:

    ```bash
    npm start
    ```

2. By default, the app will run on port 8000. If you wish to change the port, update the `PORT` variable in the `.env` file.


## API Usage Examples

Here are some example API calls that you can use to interact with the FAQ backend.

1. **Fetch FAQs in English (Default)**

    ```bash
    curl http://localhost:8000/api/faqs/
    ```

2. **Fetch FAQs in Hindi**

    ```bash
    curl http://localhost:8000/api/faqs/?lang=hi
    ```

3. **Fetch FAQs in Bengali**

    ```bash
    curl http://localhost:8000/api/faqs/?lang=bn
    ```

4. **Fetch Specific FAQ by ID**

    ```bash
    curl http://localhost:8000/api/faqs/{id}
    ```


## Environment Variables

The application requires the following environment variables to function correctly:

1. **DATABASE_URL**: Connection URL for the MySQL database.
2. **REDIS_URL**: Connection URL for the Redis server.
3. **RAPID_API_TRANSLATE_KEY**: Rapid API key for translation services (used for language translations).
4. **RAPID_API_TRANSLATE_HOST**: Host URL for the translation API.

Make sure these are set in the `.env` file as shown above.

## Contribution Guidelines

We welcome contributions to improve the project! Please follow the guidelines below:

1. **Fork the Repository**
   - Fork the repository to your own GitHub account and clone it to your local machine.

2. **Create a New Branch**
   - Create a new branch for your feature or bug fix.

   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Write Tests**

Before you submit a pull request, make sure to write unit tests for your code changes using Jest.

 4. **Commit Changes**

Commit your changes with a clear and concise commit message following the conventional commit format:

```bash
git commit -m "feat: Add new translation feature"
```

5. **Push Changes**

Push your changes to your forked repository:

```bash
git push origin feature/my-new-feature
```
6. **Create a Pull Request**

Submit a pull request to the main repository with a description of the changes you made.

## Testing

This project uses Jest for unit tests. To run the tests, use the following command:

```bash
npm test
```

### Ensure that all tests pass before submitting any changes.

There are suggestions that can be implemented but due to the time limit of the test, these improvements have not been made:

1. **User JWT Authentication**
2. **WebSocket Additions for Event-Driven Programming**

I have also created a separate standalone custom admin panel using Next.js where users can view questions with language support and a rich text editor.

GitHub link for the admin panel: [BharatFD_Backend_Admin_Panel](https://github.com/PratikSomwanshi/BharatFD_Backend_Admin_Panel)

NOTE: I prefer to build the backend in Nest.JS because of TypeScript Support but in Test mention Express so thats why I stick with it and for more robust, secure and scalable, I use JAVA Springboot.



