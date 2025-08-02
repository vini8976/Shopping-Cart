package routes

import (
	"shoppingcart/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// User routes
	r.POST("/users", controllers.CreateUser)
	r.POST("/users/login", controllers.LoginUser)
	r.GET("/users", controllers.GetUsers)

	// Item routes
	r.POST("/items", controllers.CreateItem)
	r.GET("/items", controllers.GetItems)

	// Cart routes
	r.POST("/carts", controllers.CreateCart)
	r.GET("/carts", controllers.GetCartsItems)

	// Order routes
	r.POST("/orders", controllers.PlaceOrder)
	r.GET("/orders", controllers.GetOrders)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})
}
