import {Component, OnInit} from '@angular/core';
import {AddressService} from '../../services/address/address.service';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Address} from '../../model/address/address';
import {TokenService} from '../../services/token/token.service';




@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {

  addressForm: FormGroup;
  isModalOpen = false;
  isEditMode = false;
  currentAddressId: number | null = null;
  address: Address[] = [];
  userId: number = 0;

  constructor(
    private addressService: AddressService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ){

    this.addressForm = this.fb.group({
      city: ['', Validators.required],
      ward: ['', Validators.required],
      street: ['', Validators.required],
      isDefault: [false],
    });

  }

  ngOnInit(): void {
    this.fetchAddresses();
    console.log(this.tokenService.getUserId());
  }


  fetchAddresses(): void {

    this.userId = this.tokenService.getUserId();
    this.addressService.getAddressesByUserId(this.userId).subscribe(
      (data) => {
        this.address = data;
        console.log("Fetched addresses:", data);
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách địa chỉ:', error);
      }
    );
  }


  openModal(address?: Address): void {
    if (address?.id) {
      this.isEditMode = true;
      this.currentAddressId = address.id;
      this.addressForm.patchValue(address);
      this.addressForm.patchValue(address);
    } else {

      this.isEditMode = false;
      this.currentAddressId = null;
      this.addressForm.reset();
    }
    this.isModalOpen = true;
  }


  closeModal(): void {
    this.isModalOpen = false;
  }


  onSubmit(): void {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;

      // Nếu isDefault không được chọn, mặc định là false
      if (addressData.isDefault === null || addressData.isDefault === undefined) {
        addressData.isDefault = false;
      }


      // Lấy userId từ LocalStorage
      this.userId = this.tokenService.getUserId();
      console.log("User ID from localStorage: ", this.userId);


      if (!this.userId) {
        console.error('User ID not found in localStorage');
        addressData.user = { id: this.userId };

      }else {

        // addressData.userId = parseInt(userId, 10);
        // addressData.userId = userId ? parseInt(userId, 10) : 2;
      }
      delete addressData.userId;
      console.log("Address data to be sent: ", JSON.stringify(addressData));

      // Cập nhật địa chỉ
      if (this.isEditMode && this.currentAddressId) {
        this.addressService.updateAddress(this.currentAddressId, addressData).subscribe({
          next: () => {
            this.fetchAddresses();
            this.closeModal();
          },
          error: (error) => {
            console.error('Error updating address:', error);
          }
        });
      } else {
        // Thêm địa chỉ mới
        this.addressService.createAddress(addressData).subscribe({
          next: () => {
            this.fetchAddresses();
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating address:', error);
          }
        });
      }
    }
  }



  deleteAddress(id: number | undefined): void {

    this.addressService.deleteAddress(id).subscribe({
      next: () => {
        this.fetchAddresses();  // Reload danh sách
      },
      error: (error) => {
        console.error('Error deleting address:', error);
      }
    });

  }



}
