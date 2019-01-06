import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  player: any;
  playerList: any;
  playerRank: any;
  playerId: any;
  private subscription: Subscription;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.adminService.fetchUser().subscribe(Player => {
      this.player = Player;
      this.playerId = Player.id;
    },
    err => {
      console.log(err);
      return false;
    });

    this.subscription = Observable.timer(0, 120000)
      .subscribe(() => {
        this.adminService.fetchPlayers().subscribe(playerList => {
          this.playerList = playerList
          for(var i=0;i<playerList.length;i++){
            if(playerList[i].id==this.playerId){
              this.playerRank=playerList[i].rank;
            }
          }
          console.log(playerList)

        },
        err => {
          console.log(err)
          return false
        })
      })


  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
