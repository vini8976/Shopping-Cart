package database

import (
	"log"
	"shoppingcart/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("cart.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
}

// You can auto migrate models here if needed
// DB.AutoMigrate(&models.User{})
func Migrate() {
	DB.AutoMigrate(&models.User{}, &models.Item{}, &models.Cart{}, &models.Order{})
}
