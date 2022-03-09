FROM python:3.8.12-alpine

RUN mkdir -p /opt/services/fashion-index/src
WORKDIR /opt/services/fashion-index/src

COPY Pipfile Pipfile.lock /opt/services/fashion-index/src/
RUN pip install pipenv && pipenv install --system

COPY . /opt/services/fashion-index/src

EXPOSE 80

CMD ["gunicorn", "--chdir", "fashion_index", "--bind", ":80", "fashion_index.wsgi:application"]
