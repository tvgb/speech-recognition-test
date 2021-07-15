import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

declare const webkitSpeechRecognition: any;
declare const webkitSpeechGrammarList: any;
declare const webkitSpeechRecognitionEvent: any;

@Injectable({
  providedIn: 'root'
})
export class SrService {

  private speachRecognition: SpeechRecognition = new webkitSpeechRecognition();

  constructor() {}

  listenForSingleWord(lang = 'no-NO'): Promise<string> {
    this.speachRecognition.continuous = false;
    this.speachRecognition.lang = lang;
    this.speachRecognition.interimResults = false;
    this.speachRecognition.maxAlternatives = 1;

    const res = new Promise<string>((resolve, reject) => {
      this.speachRecognition.onresult = (event) => {
        this.speachRecognition.stop();
        resolve(event.results[0][0].transcript);
      };

      this.speachRecognition.onerror = (error) => {
        reject(error);
      }
    });

    this.startSr();

    return res;
  }

  listenForWords(lang = 'nb-NO'): Subject<string> {
    const sub = new Subject<string>();

    this.speachRecognition.continuous = true;
    this.speachRecognition.lang = lang;
    this.speachRecognition.interimResults = true;
    this.speachRecognition.maxAlternatives = 1;

    this.speachRecognition.onresult = (event) => {
      console.log(event.results[0][0].transcript);
    }

    return sub;
  }

  private startSr(): void {
    try {
      this.speachRecognition.start();
    } catch (error) {
      console.log(error.message);
    }
  }
}
