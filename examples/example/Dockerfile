FROM golang:1.23-alpine as build

WORKDIR /api

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o example ./main.go

FROM alpine

COPY --from=build /api/example /

EXPOSE 3001

ENTRYPOINT [ "/example" ]