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
  favoriteId: string = '';

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFavoriteItems();
  }

  loadFavoriteItems(): void {
    this.favoriteId = `${this.authService.getClaims().UserId}Fav`;
    this.favoriteService.getFavoriteItems(this.favoriteId).subscribe(
      (favorite) => {
        this.favoriteItems = favorite.items; // Assuming 'items' is the property containing favorite meals
      },
      (error) => {
        console.error('Error fetching favorite items:', error);
      }
    );
  }
}
