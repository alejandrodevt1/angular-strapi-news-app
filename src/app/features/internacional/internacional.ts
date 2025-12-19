import { Component } from '@angular/core';
import { NoticeCard } from "../../shared/notice-card/notice-card";

@Component({
  selector: 'app-internacional',
  imports: [NoticeCard],
  templateUrl: './internacional.html',
  styleUrl: './internacional.scss',
})
export class Internacional {
  categoria:string = 'Internacional';

}
