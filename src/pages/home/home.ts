import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map'; 
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AboutPage} from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /** ATTRIBUTES */
  private loginForm : FormGroup;
  public employees: any;
  public posts: any;
  public token: any;

  constructor(public navCtrl: NavController, public http: Http, private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  /** METHODS */
  login(){
    //Login declarations
    var login = this.loginForm.value;
    var login_url = "http://dubonsap:8000/sap/opu/odata/sap/ZEMPLOYEE_INFORMATION_SRV/EmpDetailsSet?$format=json";
    var auth;

    //make Basic Authorization
    this.makeBasicAuth(login.user, login.password);
    auth = this.token;

    //create header
    var headers = new Headers();
    headers.append( "Authorization" , auth );
    headers.append( "Access-Control-Allow-Credentials" , "true" );
    headers.append( "Access-Control-Allow-Method" , "GET,PUT,POST,DELETE,OPTIONS" );
    headers.append( "X-Requested-With" , "XMLHttpRequest" );
    headers.append( "Content-Type" , "application/atom+xml");
    headers.append( "DataServiceVersion" , "2.0" );
    headers.append( "X-CSRF-Token" , "Fetch" );

    this.http.get(login_url, { headers: headers } )
      .subscribe((res) => {
          var data = res.json();
          this.employees = data.d.results;
          console.log(this.employees);
          var headers = res.headers;
          var xcsrf_token = headers.get('x-csrf-token');
          this.navCtrl.push(AboutPage, { //(Employees Page)
              employees: this.employees,
              token: xcsrf_token
          });
      },
        
        err => {
          console.log("Error at Login " + err);
          alert("Error at Login");
        });
  } //End of Login

   makeBasicAuth(user, pwd){
    var Base64 = {
            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
            // public method for encoding
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
 
                input = Base64._utf8_encode(input);
 
                while (i < input.length) {
 
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
 
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
 
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
 
                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
                }
 
                return output;
            },
 
            // public method for decoding
            decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
 
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
                while (i < input.length) {
 
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
 
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
 
                    output = output + String.fromCharCode(chr1);
 
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
 
                output = Base64._utf8_decode(output);
 
                return output;
 
            },
 
            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";
 
                for (var n = 0; n < string.length; n++) {
 
                    var c = string.charCodeAt(n);
 
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
 
                }
 
                return utftext;
            },
 
            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c =  0;
                var c1 = 0;
                var c2 = 0;
 
                while ( i < utftext.length ) {
 
                    c = utftext.charCodeAt(i);
 
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        var c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
 
                }
 
                return string;
            }
 
        }
        
        var tok = user + ':' + pwd;
        var hash = Base64.encode(tok);
        this.token = "Basic " + hash;
  }

}
