import { Component,Input } from '@angular/core';
/**
 * Generated class for the HeaderPartComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'header-offre',
  templateUrl: 'header-offre.html'
})
export class HeaderOffreComponent {
  @Input() bgcolor:any;
  @Input() logo:String;
  text: string;

  constructor() {
    console.log('Hello HeaderPartComponent Component');
    this.text = 'Hello World';
  }

}
