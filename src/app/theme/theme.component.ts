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
      console.log(form.value, 'global');
      const stylesheet =  form.value;
      if (stylesheet.globalNavColor) {
        this.header.nativeElement.style.backgroundColor = stylesheet.globalNavColor;
    }
    }


}
