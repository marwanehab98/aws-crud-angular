import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    const splitHash = hash?.split('&');
    splitHash.forEach((value) => {
      const hashObject = value.split('=');
      if (hashObject[0] === 'expires_in') {
        let expiration_date = Date.now() / 1000 + parseInt(hashObject[1]);
        localStorage.setItem('expiration_date', `${expiration_date}`);
      }
      localStorage.setItem(hashObject[0], hashObject[1]);
    });

    this.router.navigateByUrl('/')
  }
}
