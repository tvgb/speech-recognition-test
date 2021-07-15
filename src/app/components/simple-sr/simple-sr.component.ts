import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SrService } from 'src/app/services/sr.service';

@Component({
  selector: 'app-simple-sr',
  templateUrl: './simple-sr.component.html',
  styleUrls: ['./simple-sr.component.scss']
})
export class SimpleSrComponent implements OnInit {

  colours: string[];
  // grammar: string;
  currentBgColour = 'FFFFFF';
  currentColourName = 'hvit';
  listening = false;
  dots = '...';

  constructor(private changes: ChangeDetectorRef, private sr: SrService) {

    this.colours = [
      'hvit', 'blå', 'grønn', 'gul', 'rød', 'brun', 'rosa', 'beige'
    ];

    // this.grammar = `#JSGF V1.0; grammar colors; public <color> = ${this.colours.join(' | ')};`

  }

  ngOnInit(): void {
  }

  startSr(): void {
    this.getDots();
    this.listening = true;
    this.sr.listenForSingleWord().then((word) => {
      this.currentColourName = word;
      this.currentBgColour = this.getColour(word);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.listening = false;
    });
  }

  getColour(name: string): string {
    switch(name) {
      case 'blå':
        return '0000FF';

      case 'grønn':
        return '00FF00';

      case 'gul':
        return 'FFFF00';

      case 'rød':
        return 'FF0000';

      case 'brun':
        return '964B00';

      case 'rosa':
        return 'FFC0CB';

      case 'beige':
        return 'E8DCCA';

      default:
        return 'FFFFFF';
    }
  }

  getDots(): void {

    setTimeout(() => {
      if (this.dots.length === 3) {
        this.dots = '';
      } else {
        this.dots = this.dots + '.';
      }

      if (this.listening) {
        this.getDots();
      }
    }, 500);
  }
}
