# MobileStore - E-Commerce Platform

A full-stack e-commerce application for buying and selling mobile devices.

## 🎯 Project Overview

**MobileStore** is a modern e-commerce platform where users can:
- Browse mobile products
- Add items to cart
- Place orders
- Track order status
- Manage user profile

## 🏗️ Tech Stack

### Backend
- **Spring Boot** 2.7.x
- **Java** 11+
- **MySQL** / PostgreSQL
- **Maven**
- **JWT** Authentication

### Frontend
- **React** 18.x
- **Axios** for API calls
- **Redux** for state management
- **Tailwind CSS** for styling
- **Vite** for bundling

---

## 📁 Project Structure

MobileStore/
├── backend/ # Spring Boot API
├── frontend/ # React UI

---

## 🚀 Quick Start

### Prerequisites
- Java 11+
- Node.js 14+
- MySQL 5.7+
- Git

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
# API runs on http://localhost:8080
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173

# MobileStore Backend

Spring Boot REST API with PostgreSQL database.

## 📋 Requirements

- Java 11+
- Maven 3.6+
- PostgreSQL 12+

```

### 2. Application Properties Configuration

**backend/src/main/resources/application.properties:**

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/mobilestore
spring.datasource.username=mobilestore_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Application Name
spring.application.name=MobileStore

# Logging
logging.level.root=INFO
logging.level.com.mobilestore=DEBUG
```

### 3. Development Environment

**backend/src/main/resources/application-dev.properties:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mobilestore
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.root=INFO
logging.level.com.mobilestore=DEBUG
```

### 4. pom.xml Dependencies

**Add to pom.xml:**

```xml
<!-- PostgreSQL Driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.5.1</version>
    <scope>runtime</scope>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>
```

### 5. Install & Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
```
