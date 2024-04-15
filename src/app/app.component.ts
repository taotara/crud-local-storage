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
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal() {
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    this.studentObj = new Student(); // Create a blank new modal everytime
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Student) {
    const isDelete = confirm('Are you sure you want to Delete?');
    if (isDelete) {
      const currentRecord = this.studentList.findIndex(
        (m) => m.id === this.studentObj.id
      );
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModal();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(
      (m) => m.id === this.studentObj.id
    );
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.email = this.studentObj.email;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.address = this.studentObj.address;
    }
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModal();
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem('angular17crud');
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      // To show the newly added records
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      // To show the newly added records
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
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
