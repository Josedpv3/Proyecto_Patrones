FROM openjdk:8

COPY target/Proyecto_patrones.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
