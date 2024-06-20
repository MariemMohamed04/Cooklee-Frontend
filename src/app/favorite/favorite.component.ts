import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FavoriteItem } from '../models/favorite-item';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';
import { Favorite } from '../models/favorite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteItems: FavoriteItem[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // this.loadFavorites();
  }

  // loadFavorites(): void {
  //   const userId = this.authService.getClaims().UserId;
  //   this.favoriteService.getUserFavorites(userId).subscribe(
  //     (data: Favorite) => {
  //       this.favoriteItems = data.items;
  //     },
  //     (error) => {
  //       console.error('Error fetching favorite items:', error);
  //     }
  //   );
  // }

  // removeFromFavorites(item: FavoriteItem): void {
  //   const userId = this.authService.getClaims().UserId;
  //   this.favoriteService.deleteFavoriteItem(userId, item).subscribe(
  //     (response) => {
  //       this.favoriteItems = this.favoriteItems.filter(i => i.id !== item.id);
  //       console.log('Removed from favorites:', response);

  //       // Also remove from cart if exists
  //       this.cartService.removeFromCart(userId, item).subscribe(
  //         (cartResponse) => {
  //           console.log('Removed from cart:', cartResponse);
  //           // Update cart list if needed
  //         },
  //         (cartError) => {
  //           console.error('Error removing from cart:', cartError);
  //         }
  //       );

  //     },
  //     (error) => {
  //       console.error('Error removing from favorites:', error);
  //     }
  //   );
  // }
}
