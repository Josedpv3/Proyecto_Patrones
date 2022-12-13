FROM openjdk:8

COPY target/curso-Proyecto_patrones.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
