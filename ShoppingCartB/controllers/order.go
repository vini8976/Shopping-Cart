package controllers

import (
	"net/http"
	"shoppingcart/database"
	"shoppingcart/models"

	"github.com/gin-gonic/gin"
)

func PlaceOrder(c *gin.Context) {
	var input struct {
		UserID uint `json:"user_id"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart
	if err := database.DB.Preload("Items").Where("user_id = ?", input.UserID).First(&cart).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
		return
	}

	order := models.Order{
		UserID: input.UserID,
		Items:  cart.Items,
	}

	database.DB.Create(&order)

	// optional: clear the cart
	database.DB.Model(&cart).Association("Items").Clear()

	c.JSON(http.StatusOK, order)
}
func GetOrders(c *gin.Context) {
	var orders []models.Order

	// Preload associated Items for each Order
	if err := database.DB.Preload("Items").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, orders)
}
