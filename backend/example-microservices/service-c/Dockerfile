FROM python:3.13.3-alpine

WORKDIR /app

# Install curl for in container testing
RUN apk add --no-cache curl

COPY . .

RUN pip install -r requirements.txt 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
# uvicorn main:app --host 0.0.0.0 --port 3003"
