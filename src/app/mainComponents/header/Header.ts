import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Header.html',
})
export class Header implements OnInit {
  currentFlag: string = '';
  constructor() {}

  ngOnInit(): void {}
}
