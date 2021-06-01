import {ElementRef} from "@angular/core";

// @ts-ignore
declare var M

export class MaterialService{
  static toast(message: string){
    M.toast({html: message})
  }

  static updateTextInputs(){
    M.updateTextFields()
  }
}
