# Use official Golang image as the builder
FROM golang:1.22-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy go.mod and go.sum first to leverage Docker layer caching
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the code
COPY . .

# Build the Go application
RUN go build -o shoppingcart .

# Use a minimal image for final output
FROM alpine:latest

WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/shoppingcart .

# Expose port
EXPOSE 8080

# Start the app
CMD ["./shoppingcart"]
