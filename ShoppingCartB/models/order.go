package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	Items  []Item `gorm:"many2many:order_items"`
	UserID uint
}
