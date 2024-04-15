import { LocalizedString } from '@angular/compiler';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('newStudentModal') modal: ElementRef | undefined;

  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('nagular17crud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal() {
    this.studentObj = new Student(); // Create a blank new modal everytime
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem('nagular17crud');
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      oldArray.push(this.studentObj);
      // To show the newly added records
      this.studentList = oldArray;
      localStorage.setItem('nagular17crud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      // To show the newly added records
      this.studentList = newArr;
      localStorage.setItem('nagular17crud', JSON.stringify(newArr));
    }
    // to close the modal after save
    this.closeModal();
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
