import { Component } from '@angular/core';
import { NoticeCard } from "../../shared/notice-card/notice-card";

@Component({
  selector: 'app-nacional',
  imports: [NoticeCard],
  templateUrl: './nacional.html',
  styleUrl: './nacional.scss',
})
export class Nacional {
  categoria:string = 'Nacional'
}
