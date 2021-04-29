import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('headchange') header;
    onSubmit(form) {
        this.global(form.value);
    }

    global(stylesheet) {
        if (stylesheet.globalNavColor) {
            this.header.nativeElement.style.backgroundColor = stylesheet.globalNavColor;
        }
    }


}
