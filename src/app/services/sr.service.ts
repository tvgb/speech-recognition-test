import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const webkitSpeechRecognition: any;

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

  listenForSentences(lang = 'nb-NO'): Subject<string> {
    const sub = new Subject<string>();

    this.speachRecognition.continuous = true;
    this.speachRecognition.lang = lang;
    this.speachRecognition.interimResults = true;
    this.speachRecognition.maxAlternatives = 1;

    let text = '';
    let currentText = '';
    let resultIndex = 0;

    this.startSr();

    this.speachRecognition.onresult = (event) => {
      if (resultIndex !== event.resultIndex) {
        text += currentText + '. ';
        resultIndex = event.resultIndex;
      }

      currentText = event.results[event.resultIndex][0].transcript;
      sub.next(text + currentText);
    }

    return sub;
  }

  stopSr(): void {
    try {
      this.speachRecognition.stop();
    } catch (error) {
      console.log(error.messsage);
    }
  }

  private startSr(): void {
    try {
      this.speachRecognition.start();
    } catch (error) {
      console.log(error.message);
    }
  }
}
