FROM maven:3.9.8-eclipse-temurin-21-jammy
LABEL authors="WilWagnerS"

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

WORKDIR /app

COPY --from=builder /app/target/TransBus-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar","TransBus-0.0.1-SNAPSHOT.jar"]