import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  //Attributes
  employees : any;
  token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.employees = navParams.get('employees');
    this.token = navParams.get('token');
    console.log(this.token);
  }

  buttonClick(employee){
    this.navCtrl.push(DetailsPage, {
              details: employee,
              token: this.token
            });
  }

}
