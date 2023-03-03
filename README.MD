# Arch Master
Arch Master is a platform that allows users to create and submit new code or architecture challenges for evaluation. The project is built with TypeScript and Node.js, and implements some concepts of Clean Architecture and DDD.

## Running the Project
To run the project in development mode, run the following command:

```bash
npm run dev
```

This will start the project using ts-node-dev, which provides fast automatic reloading and allows for easier development.

To run the tests for the project, run the following command:

```bash
npm test
```

This will use vite as the test framework.

## Concepts Implemented
### Clean Architecture
Clean Architecture is a software design pattern that separates the business logic from the implementation details. The architecture is divided into layers, with each layer having a specific responsibility.

The layers in Clean Architecture are:

Presentation Layer (web): This layer contains the user interface and is responsible for presenting data to the user.
Application Layer: This layer contains the use cases and is responsible for implementing the business logic.
Domain Layer: This layer contains the domain models and is responsible for defining the business rules.
Infrastructure Layer: This layer contains the implementation details, such as databases and external APIs.

Arch Master implements the Clean Architecture pattern by separating the code into different layers and ensuring that each layer has a specific responsibility.

### DDD
Domain-driven design (DDD) is a software development approach that emphasizes the importance of the domain model in the software design. The domain model is the representation of the business rules and processes, and is central to the development process.

Arch Master implements some concepts of DDD by focusing on the domain model and ensuring that the domain logic is separated from the infrastructure details. This allows for easier maintenance and updates in the future.
