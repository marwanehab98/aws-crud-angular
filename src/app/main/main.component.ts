import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { ItemsService } from '../items.service';
import { CommonModule } from '@angular/common';
import isNotNumeric from '../utils/isNotNumeric';
import { HttpClientModule } from '@angular/common/http';

interface Item {
  id: string;
  name: string;
  price: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  loginUrl = `${environment.COGNITO_DOMAIN}/login?response_type=token&client_id=${environment.COGNITO_CLIENT_ID}&redirect_uri=${environment.REDIRECT_URI}/redirect-login`;
  isAuthenticated = this.authService.isAuthenticated();
  nameInputValue = '';
  priceInputValue = '';
  items: Item[] = [];
  selectedItem: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.loading = true;
    this.itemsService
      .getItems()
      .pipe()
      .subscribe((res) => {
        this.loading = false;
        if (res) {
          this.items = JSON.parse((res as any).body);
        } else console.log('something went wrong');
      });
  }

  changeNameInput(name: string) {
    this.nameInputValue = name;
  }

  changePriceInput(price: string) {
    this.priceInputValue = price;
  }

  handlePutClick() {
    if (this.isNotNumeric(this.priceInputValue)) return;
    if (this.priceInputValue.trim() === '' || this.nameInputValue.trim() === '')
      return;
    this.loading = true;
    this.itemsService
      .putItems(this.selectedItem, this.nameInputValue, this.priceInputValue)
      .pipe()
      .subscribe((res) => {
        this.loading = false;
        if (!this.selectedItem) {
          this.priceInputValue = '';
          this.nameInputValue = '';
        }
        this.getItems();
      });
  }

  handleSelectClick(id: string) {
    if (this.selectedItem === id) {
      this.selectedItem = null;
      this.nameInputValue = '';
      this.priceInputValue = '';
    } else {
      this.selectedItem = id;
      let item = this.items.find((value) => value.id === id);
      this.nameInputValue = item?.name || '';
      this.priceInputValue = item?.price || '';
    }
  }

  handleDeleteClick(id: string) {
    this.loading = true;
    this.itemsService
      .deleteItem(id)
      .pipe()
      .subscribe((res) => {
        this.loading = false;
        this.getItems();
      });
  }

  isNotNumeric(value: string): any {
    return isNotNumeric(value);
  }

  logOut() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.items = [];
  }
}
