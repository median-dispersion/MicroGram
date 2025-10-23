FROM python:slim

WORKDIR /MicroGram

COPY Server Server
COPY Client Client

WORKDIR Server

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["uvicorn", "main:server", "--host", "0.0.0.0", "--port", "80"]