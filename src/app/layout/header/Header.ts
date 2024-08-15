import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Header.html',
})
export class Header {
  title = 'HEADER';
}
