import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'fileLink'
})
export class FileLinkPipe implements PipeTransform {
  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) {

  }
  transform(value: any, isSafe: boolean): any {
    var r = value.EXTFILENAME
      .replace("../../system/mail", "https://pri.habitat.co.il/Files")
      .replace("..\\..\\system\\mail", "https://pri.habitat.co.il/Files");

    if (!isSafe)
      return r;

    return this.sanitizer.bypassSecurityTrustUrl(r);
  }

}
