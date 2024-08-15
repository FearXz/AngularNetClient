import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './Header.html',
})
export class Header {
  currentFlag = '../../../assets/images/utilities/it.svg';
  title = 'HEADER';
}
