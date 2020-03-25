import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2, ChangeDetectorRef, TemplateRef, ReflectiveInjector, ComponentFactory } from '@angular/core';
import { switchMap, filter, map, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { PopupRef } from '../../types/popup-ref';
import { AbstractPopupComponent } from '../../types/abstract-popup-component';

interface ComponentItem {
  name: any;
  data: any;
}


@Component({
  selector: 'r-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.scss']
})
export class WidgetMenuComponent implements AfterContentInit, OnInit {

  public open<C extends AbstractPopupComponent<D, R>, D, R>(
    component: C, data: D): Observable<R> {
      this.componentSubj.next({ name: component, data });

      return this.closedPopup.asObservable()
        .pipe( take(1) )
  }

  private componentSubj: Subject<ComponentItem> = new Subject<ComponentItem>();
  private closedPopup: Subject<any> = new Subject<any>();

  public isOpen$: Observable<boolean>;

  @ViewChild('container', { read: ViewContainerRef }) private containerRef: ViewContainerRef;


  constructor(
    private cd: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    this.componentSubj.asObservable()
      .pipe(
        filter(cmp => !!cmp),
        switchMap(cmp => this.onComponentNameChanged(cmp)),
        map((resultData) => {
          this.closedPopup.next(resultData);
          this.componentSubj.next();
        })
      )
      .subscribe();

    this.isOpen$ = this.componentSubj.asObservable()
          .pipe(
            map(cmp => !!cmp)
          );

    this.closedPopup.asObservable()
            .subscribe(() => {
              this.containerRef.clear();
            })
    
    
  }

  private onComponentNameChanged(component: ComponentItem): Observable<any> {
      const popupRef = new PopupRef();
      popupRef.data = component.data;
      let inputs = { popupRef };
      let inputProviders = Object.keys(inputs)
        .map((inputName) => { return { provide: inputName, useValue: inputs[inputName] }; });
      let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
      let injector: ReflectiveInjector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.containerRef.parentInjector);
      let factory = this.resolver.resolveComponentFactory(component.name as any);
      let cmp = factory.create(injector);
      cmp.instance['popupRef'] = popupRef;
      this.containerRef.insert(cmp.hostView);
      this.cd.detectChanges();
      return popupRef.closed();
  }


  public closeAll(): void {
    this.closedPopup.next();
    this.componentSubj.next();
  }




}
