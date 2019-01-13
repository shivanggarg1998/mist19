import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
declare var require: any;
require('../assets/js/main/jquery.min.js');
require('../assets/js/main/bootstrap.bundle.min.js');
require('../assets/js/app.js');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  "../assets/css/icons/icomoon/styles.css",
  "../assets/css/bootstrap.min.css",
  "../assets/css/bootstrap_limitless.min.css",
  "../assets/css/layout.min.css",
  "../assets/css/components.min.css",
  "../assets/css/colors.min.css"
]
})
export class AppComponent {
  player: any;
  playerRank: any;
  title = 'Mist';
  constructor(
    
    private adminService: AdminService,
    private router: Router
  ) { }
  ngOnInit() {
    
    this.adminService.fetchUser().subscribe(Player => {
      this.player = Player;
      if(Player.isNotBan==false){
        this.router.navigate(['/']);}
    },
    err => {
      console.log(err);
      return false;
    });
    this.adminService.fetchPlayers().subscribe(playerList => {
      this.playerRank= playerList.current_rank;
    },
    err => {
      console.log(err)
      return false
    })


  }
}
