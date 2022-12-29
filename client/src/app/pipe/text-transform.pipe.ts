import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {

  transform(value: string): string {
    let replaceText = ''
    if(value !== ''){
      if(value.includes('en:')){
        replaceText = value.replace(/en:/g, "");
        console.log(replaceText, "replacetext");
      } else {
        replaceText = value
      }
      replaceText = replaceText.replace(/\,/g, ", ");
    }
    return `${ replaceText }</b>`;
  }

}
