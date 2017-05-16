import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AboutPage } from '../about/about';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  //Attributes
  private detailsForm : FormGroup;
  private details;
  private token: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, public http: Http ) {
     //Initialize Details
    var detail = navParams.get('details');
    this.token = navParams.get('token');
    console.log(this.token);

    //Initialize Form
    this.detailsForm = this.formBuilder.group({
      id: [''],
      name: [''],
      salary: [''],
      address: [''],
      country: [''],
      city: [''],
      street1: [''],
      street2: [''],
    });

    console.log(detail);
    this.details = detail;
  } // End of Constructor

  update(){
     var emp = this.detailsForm.value;
     // REST API PUT / Gateway Service Update URL
     var url = "http://dubonsap:8000/sap/opu/odata/sap/ZEMPLOYEE_INFORMATION_SRV/EmpDetailsSet(EmpID='"+ emp.id +"')";

     //Create JSON for PUT
     var employeeJSON = {
                        "d" : {
                            "__metadata" : {
                                "uri" : url,
                                "type" : "ZEMPLOYEE_INFORMATION_SRV.EmpDetails"
                            },
                            "Address": emp.address,
                            "Details":{
			                          "__metadata": {
				                                  "type":"ZEMPLOYEE_INFORMATION_SRV.Details"
				                        },
                            "Country":"",
			                      "City":"",
			                      "Street2":"",
			                      "Street1":""
		                        },
                            "EmpID": emp.id,
                            "Name": emp.name,
                            "Salary": emp.salary,
                        }
                      };
    //headers
      var headers = new Headers();
      headers.append( "X-Requested-With" , "XMLHttpRequest" );
      headers.append( "X-CSRF-Token" , this.token );
      headers.append( "DataServiceVersion" , "2.0"  );
      headers.append( "Accept" , "application/atom+xml,application/atomsvc+xml,application/xml,application/json" );
      headers.append( "Access-Control-Allow-Method" , "GET,PUT,POST,DELETE,OPTIONS");
      headers.append( 'Content-Type', 'application/json');
      headers.append( 'Data-Type', 'json');

      this.http.put( url, employeeJSON, { headers: headers } )
      .subscribe((res) => {
        var data = res;
        console.log('data ' + data); 
        var headers = res.headers;
        console.log('headers ' + headers);
        alert('Update Success!');
      },
       err => { 
          console.log(err);
		      alert('Update Error!');
       });
  }

  create(){
    // REST API POST / Gateway Service Create URL
    var url = "http://dubonsap:8000/sap/opu/odata/sap/ZEMPLOYEE_INFORMATION_SRV/EmpDetailsSet";

    var emp = this.detailsForm.value;
    console.log("emp");
	console.log(emp);

    //Create JSON for POST
    var employeeJSON = {
                        "d" : {
                            "__metadata" : {
                                //"id" : url,
                                "uri" : url,
                                "type" : "ZEMPLOYEE_INFORMATION_SRV.EmpDetails"
                            },
                            "Address": emp.address,
                            "Details":{
			                          "__metadata": {
				                                  "type":"ZEMPLOYEE_INFORMATION_SRV.Details"
				                        },
                            "Country":"",
			                      "City":"",
			                      "Street2":"",
			                      "Street1":""
		                        },
                            "EmpID": emp.id,
                            "Name": emp.name,
                            "Salary": emp.salary,
                        }
                      };
     //headers
      var headers = new Headers();
      headers.append( "X-Requested-With" , "XMLHttpRequest" );
      headers.append( "X-CSRF-Token" , this.token );
      headers.append( "DataServiceVersion" , "2.0"  );
      headers.append( "Accept" , "application/atom+xml,application/atomsvc+xml,application/xml,application/json" );
      headers.append( "Access-Control-Allow-Method" , "GET,PUT,POST,DELETE,OPTIONS");
      headers.append( 'Content-Type', 'application/json');
      headers.append( 'Data-Type', 'json');

      this.http.post( url, employeeJSON, { headers: headers } )
      .subscribe((res) => {
        var data = res;
        console.log('data ' + data); 
        var headers = res.headers;
        console.log('headers ' + headers);
        alert('Create Success!');
      },
       err => { 
          console.log(err);
		      alert('Create Error!');
       });
  }

  delete(){
    var emp = this.detailsForm.value;
     // REST API DELETE / Gateway Service Delete URL
    var url = "http://dubonsap:8000/sap/opu/odata/sap/ZEMPLOYEE_INFORMATION_SRV/EmpDetailsSet(EmpID='"+ emp.id +"')";
    //headers
      var headers = new Headers();
      headers.append( "X-Requested-With" , "XMLHttpRequest" );
      headers.append( "X-CSRF-Token" , this.token );
      headers.append( "DataServiceVersion" , "2.0"  );
      headers.append( "Accept" , "application/atom+xml,application/atomsvc+xml,application/xml,application/json" );
      headers.append( "Access-Control-Allow-Method" , "GET,PUT,POST,DELETE,OPTIONS");
      headers.append( 'Content-Type', 'application/json');
      headers.append( 'Data-Type', 'json');

      this.http.delete( url, { headers: headers } )
      .subscribe((res) => {
        var data = res;
        console.log('data ' + data); 
        var headers = res.headers;
        console.log('headers ' + headers);
        alert('Delete Success!');
      },
       err => { 
          console.log(err);
		      alert('Delete Error!');
       });
  }

}