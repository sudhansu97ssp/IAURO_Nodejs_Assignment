# IAURO_Nodejs_Assignment

This is a Node.js application that can be run locally for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install the latest version from [https://nodejs.org/](https://nodejs.org/).
- **Git**: Ensure Git is installed on your system. You can download it from [https://git-scm.com/](https://git-scm.com/).
- **npm**: This comes bundled with Node.js, so it will be installed with Node.js. Verify the installation by running:

  ```bash
  node -v
  npm -v

Project Setup Instructions
Follow these steps to get the application running locally.

  1. Clone the Repository
  Clone the project repository to your local machine using Git:
  
  git clone <repository-url>

  Replace <repository-url> with the actual URL of the Git repository.

  Then, navigate into the project directory:
  cd <project-directory>

  2. Install Dependencies
  Once you are inside the project directory, install the required dependencies using npm:
  
  npm install

  This will download and install all necessary packages and modules listed in the package.json file into the node_modules folder.

  3. Configure Environment Variables
  Create a .env file in the root directory of your project to configure environment-specific variables. You can refer to an existing .env.example file (if available) to know what variables are required.

  An example of the .env file could look like:
  PORT=3000
  DATABASE_URL=mongodb://localhost:27017/myapp
  JWT_SECRET=your_jwt_secret_key

  Ensure to replace these with the correct values based on your environment (development, production, etc.).

  4. Run the Application
  You can run the application locally in different modes:

  Development Mode
  Start the application in development mode, which includes automatic restarts when you make changes (assuming nodemon is configured):

  npm run dev

  5. Access the Application
  Once the application is running, open your web browser and go to:

  http://localhost:3000

  
