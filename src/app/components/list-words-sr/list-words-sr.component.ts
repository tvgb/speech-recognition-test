import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap, takeUntil} from 'rxjs/operators';

import { SrService } from 'src/app/services/sr.service';

@Component({
  selector: 'app-list-words-sr',
  templateUrl: './list-words-sr.component.html',
  styleUrls: ['./list-words-sr.component.scss']
})
export class ListWordsSrComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  isRecording = false;
  text = '';

  constructor(private sr: SrService, private changes: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  startListenForSentences(): void {
    this.isRecording = true;
    this.sr.listenForSentences().pipe(
      takeUntil(this.unsubscribe),
      tap((res) => {
        this.text = res;
        this.changes.detectChanges();
      })
    ).subscribe();
  }

  stopListenForSentences(): void {
    this.isRecording = false;
    this.text += '.';
    this.sr.stopSr();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }
}
