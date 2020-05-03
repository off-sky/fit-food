import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  public back(): void {
    this.location.back();
  }

  public calendar(): void {
    this.router.navigate(['calendar']);
  }

  public dayDetails(dayId: string): void {
    this.router.navigate(['calendar', 'day', dayId, 'details']);
  }

  public dayEdit(dayId: string): void {
    this.router.navigate(['calendar', 'day', dayId, 'edit']);
  }

  public mealEdit(dayId: string, mealId: number): void {
    this.router.navigate(['calendar', 'day', dayId, 'edit', mealId]);
  }
  

}
