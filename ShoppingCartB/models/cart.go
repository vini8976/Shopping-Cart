package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	Items  []Item `gorm:"many2many:cart_items"`
	UserID uint
}
