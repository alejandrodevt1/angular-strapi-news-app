import { Component } from '@angular/core';
import { NoticeCard } from "../../shared/notice-card/notice-card";

@Component({
  selector: 'app-cultural',
  imports: [NoticeCard],
  templateUrl: './cultural.html',
  styleUrl: './cultural.scss',
})
export class Cultural {
  categoria:string ='Cultural'
}
