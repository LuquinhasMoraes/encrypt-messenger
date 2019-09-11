import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

export class EncrypterDataModel {
  input: string;
  output: string;
  key: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  encrypt: EncrypterDataModel = new EncrypterDataModel();
  showbtnShared: boolean;

  constructor(private socialSharing: SocialSharing) {
  // 
  }

  shareWhatApp(){
    this.socialSharing.shareViaWhatsApp(this.encrypt.output + "\n\nKey: " + this.encrypt.key);
  }

  encryptString() {
    this.showbtnShared = true;
    try {
      this.encrypt.output = CryptoJS.AES.encrypt(JSON.stringify(this.encrypt.input), this.encrypt.key).toString();
    } catch (e) {
      console.log(e);
    }
  }


  decryptString() {

    try {
      const bytes = CryptoJS.AES.decrypt(this.encrypt.input, this.encrypt.key);
      if (bytes.toString()) {
        this.encrypt.output = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      // this.encrypt.output = this.encrypt.input;
    } catch (e) {
      console.log(e);
    }
  }


}
