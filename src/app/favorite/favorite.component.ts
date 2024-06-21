import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FavoriteItem } from '../models/favorite-item';
import { FavoriteService } from '../services/favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteItems: FavoriteItem[] = [];
  favoriteId: string = `${this.authService.getClaims().UserId}-fav`;
  cartId: string = `${this.authService.getClaims().UserId}-cart`;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadFavoriteItems();
  }

  loadFavoriteItems(): void {
    this.favoriteService.getFavorite(this.favoriteId).subscribe(
      (favorite) => {
        this.favoriteItems = favorite.items;
      },
      (error) => {
        console.error('Error loading favorite items:', error);
      }
    );
  }

  removeFavoriteItem(item: FavoriteItem): void {
    this.favoriteService.removeFavoriteItem(this.favoriteId, item).subscribe(
      (favorite) => {
        console.log('Item removed from favorite:', favorite);
        this.favoriteItems = this.favoriteItems.filter(favItem => favItem.id !== item.id);
      },
      (error) => {
        console.error('Error removing item from favorite:', error);
      }
    );
  }

  addToCart(item: FavoriteItem): void {
    const cartItem: CartItem = {
      id: item.id,
      mealName: item.mealName,
      image: item.image,
      price: item.price,
      quantity: 1
    };

    this.cartService.addToCart(this.cartId, cartItem).subscribe(
      (cart) => {
        console.log('Item added to cart:', cart);
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
}

