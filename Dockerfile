FROM maven:3.9.8-eclipse-temurin-17-jammy AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=builder /app/target/TransBus-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "TransBus-0.0.1-SNAPSHOT.jar"]