import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { json } from 'stream/consumers';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  set color(value: string){
    // console.log({color: value});
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined){
    this._errors = value;
    this.setErrorMessage();

    // console.log(value);

  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log('Constructor de la directiva')
    // console.log(el);
    this.htmlElement = el;

    // this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';
   }

  ngOnInit(): void {
    this.setStyle();
    // throw new Error('Directiva - NgOnInit');
  }

  setStyle():void{
    if(!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void{

    if(!this.htmlElement) return;
    if( !this._errors){
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors)

    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if(errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Minimo ${current}/${min} caracteres`;
      return;
    }

    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo';
      return;
    }


  }

}
