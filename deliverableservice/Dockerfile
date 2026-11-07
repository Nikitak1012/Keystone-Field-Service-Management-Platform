# ==========================================
# Stage 1: Build the Application with Maven
# ==========================================
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy the pom.xml first to take advantage of Docker layer caching
COPY pom.xml .

# Download dependencies in an isolated layer
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the application (skip tests for faster deployment builds)
RUN mvn clean package -DskipTests

# ==========================================
# Stage 2: Minimal Production Runtime
# ==========================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create upload directory for project submission files
RUN mkdir -p uploads/projects

# Copy the compiled JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default port
EXPOSE 7373

# Run the Spring Boot application using Render's dynamic $PORT (fallback to 7373)
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-7373} -jar app.jar"]

