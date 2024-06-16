FROM mongo:7.0.8

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y curl

COPY config-replica.js /
COPY mongo-init.js /
COPY connectors/sink.json /connectors/
COPY connectors/source.json /connectors/
COPY connectors/cx /usr/local/bin/
RUN chmod +x /usr/local/bin/cx