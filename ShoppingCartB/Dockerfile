# Use newer Go version (1.24.5 or higher)
FROM golang:1.24.5-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go app
RUN go build -o shoppingcart .

# Final image
FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/shoppingcart .

EXPOSE 8080

CMD ["./shoppingcart"]
