import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonorDetailService {
  status: string;
  donorAddress: string;
  ApproximateEta: string;
  setStatus(status:string){
    this.status=status
  }
  setDonorAddress(donorAddress: string){
    this.donorAddress=donorAddress
  }
  setApproximateETA(ApproximateEta: string) {
    this.ApproximateEta=ApproximateEta
  }
  getStatus(): string {
    return this.status;
  }
  getDonorAddress(): string {
    return this.donorAddress
  }
  getApproximateETA(): string {
    return this.ApproximateEta
  }

  constructor() { }
}
