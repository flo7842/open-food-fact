import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    let replaceText = ''
    if(value.includes('en:')){
      console.log(replaceText, "en");
      replaceText = value.replace("en:", "");
      
    }
    //replaceText = replaceText.replace(",", ", ");
    return `${ replaceText }`;
  }

}
