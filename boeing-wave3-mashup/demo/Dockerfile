FROM openjdk:10

ADD ./target/demo-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8029

ENTRYPOINT ["java","-jar","demo.jar"]
