import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { ICustomer, IState } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'customer-edit',
  templateUrl: 'customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

  customer: ICustomer = {
    _id: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    email: '',
    city: '',
    state: {
        abbreviation: '',
        name: ''
    },
    stateId: 0,
    zip: 0
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    }

    this.getStates();
  }

  getCustomer(id: string) {
      this.dataService.getCustomer(id)
           .subscribe((customer: ICustomer) => {
             const cust = JSON.stringify(customer);
             this.customer =  JSON.parse(cust);    
           }, 
           (err: any) => console.log(err));
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit() {

  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/customers']);
          }
          else {
            this.errorMessage = 'Unable to delete customer';
          }
        },
        (err) => console.log(err));
  }

}