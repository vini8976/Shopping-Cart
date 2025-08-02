package controllers

import (
	"net/http"
	"shoppingcart/database"
	"shoppingcart/models"

	"github.com/gin-gonic/gin"
)

type CreateCartInput struct {
	UserID uint `json:"user_id"`
	ItemID uint `json:"item_id"`
}

func CreateCart(c *gin.Context) {
	var input CreateCartInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart
	database.DB.Where("user_id = ?", input.UserID).FirstOrCreate(&cart, models.Cart{UserID: input.UserID})

	var item models.Item
	if err := database.DB.First(&item, input.ItemID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}

	database.DB.Model(&cart).Association("Items").Append(&item)
	c.JSON(http.StatusOK, cart)
}

func GetCartsItems(c *gin.Context) {
	var carts []models.Cart
	database.DB.Preload("Items").Find(&carts)
	c.JSON(http.StatusOK, carts)

}
