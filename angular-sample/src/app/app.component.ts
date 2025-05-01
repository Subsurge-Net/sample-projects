import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { SubsurgeService } from '../services/subsurge.service';
import { CurrentUserDto } from 'subsurge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'Subsurge Angular Sample';
  @ViewChild('gbutton') gbutton: ElementRef = new ElementRef({});

  subsurgeService: SubsurgeService = inject(SubsurgeService);
  loggedIn: boolean = false;
  user: CurrentUserDto | null = null;

  ngOnInit(): void {
    this.subsurgeService.user$.subscribe((user) => {
      this.user = user;
    });
    this.subsurgeService.isAuthenticated().then(async (isAuthenticated) => {
      this.loggedIn = isAuthenticated;
      this.user = await this.subsurgeService.loadUserInfo();
    });
  }
  
  
  ngAfterViewInit(): void {
    this.subsurgeService.googleAuthService
      .renderGoogleButton(this.gbutton.nativeElement);
  }

  async logout() {
    await this.subsurgeService.logoutAsync();
    this.loggedIn = false;
    this.user = null;
  }
  async onLogin() {
    this.loggedIn = await this.subsurgeService.isAuthenticated()
  }
}
