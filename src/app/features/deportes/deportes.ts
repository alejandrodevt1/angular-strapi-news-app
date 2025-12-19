import { Component } from '@angular/core';
import { NoticeCard } from "../../shared/notice-card/notice-card";

@Component({
  selector: 'app-deportes',
  imports: [NoticeCard],
  templateUrl: './deportes.html',
  styleUrl: './deportes.scss',
})
export class Deportes {

  categoria:string = 'Deportes'
}
