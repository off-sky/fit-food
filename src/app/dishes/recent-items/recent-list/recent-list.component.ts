import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentItemService } from '../recent-item.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {

  public isShown$: Observable<boolean>;
  public isCollapsed$: Observable<boolean>;
  public items$: Observable<string[]>;

  @Output() public opened: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private recentService: RecentItemService
  ) { }

  ngOnInit(): void {
    this.items$ = this.recentService.list();
    this.isShown$ = this.items$
      .pipe(
        map(items => items.length > 0)
      );
    this.isCollapsed$ = this.recentService.collapsed();
  }

  public onRemove(id: string): void {
    this.recentService.remove(id);
  }

  public onClick(id: string): void {
    this.opened.emit(id);
  }

  public onToggleCollapsed(): void {
    this.recentService.toggleCollapsed();
  }

}
