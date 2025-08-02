package main

import (
	"shoppingcart/controllers"
	"shoppingcart/database"
	"shoppingcart/models"
	"shoppingcart/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
	corsMiddleware := cors.Default()
	r.Use(corsMiddleware)
	r.Use(cors.Default())
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
	database.InitDB()
	database.Migrate()
	routes.SetupRoutes(r)
	seedItems()
	r.Run(":8080")
	r.POST("/users/login", controllers.LoginUser)

}
func seedItems() {
	var count int64
	database.DB.Model(&models.Item{}).Count(&count)

	if count == 0 {
		items := []models.Item{
			{Name: "Book", Price: 199},
			{Name: "Pen", Price: 49},
			{Name: "Notebook", Price: 129},
			{Name: "Laptop", Price: 50000},
		}
		for _, item := range items {
			database.DB.Create(&item)
		}
		println("✅ Default items seeded.")
	} else {
		println("ℹ️ Items already exist, skipping seed.")
	}
	database.DB.AutoMigrate(&models.User{})
}
