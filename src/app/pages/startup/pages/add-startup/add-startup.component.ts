import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { StartupsService } from 'src/app/core/services/startups.service';
import { UploadService } from 'src/app/core/services/upload.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css'],

})
export class AddStartupComponent implements OnInit {
  formGroup:FormGroup;
  imgSrc:any;
  sectorsData$:any;
  constructor(private formBuilder:FormBuilder,
    private _startupsService:StartupsService,
    private _uploadService:UploadService,
    private location:Location,
    private _sectorsService:SectorsService ) {
    this.formGroup=this.formBuilder.group({
      name:[null,[Validators.required]],
       logo:null,
       city:null,
       sectors:[null,[Validators.required]],
       numberOfEmployees:null,
       yearsOfEstablish:null,
       websiteUrl:[null,[Validators.required]],
       emailAddress:[null,[Validators.email,Validators.required]],


    })
  }

  ngOnInit(): void {
    this.gellAllSectors();
  }

  getErrorMessage(control:any)
  {
    if(control.hasError('required'))
    {
      return 'You must enter a value';
    }

    if(control.hasError('email'))
    {
      return 'Not a valid email';

    }

    return '';

  }

  onAddclicked()
  {
    if(this.formGroup.invalid)
    {
      this.validateFormGroup()

    }
    else
    {
      if(this.formGroup.controls['logo'].value)
      {
        this.upload();

      }
      else{
        this.createStartup();

      }
    }

  }
  upload()
  {

    this._uploadService.
    upload(this.formGroup.controls['logo'].value)
    .subscribe((file)=>{
      if(file?.metadata)
      {
        this.getDownloadURL();

      }

    })

  }
  getDownloadURL()
  {
    this._uploadService.getDownloadURL().subscribe((url)=>{
      this.formGroup.controls['logo'].setValue(url);
      this.createStartup();
    });


  }
  validateFormGroup()
  {
    Object.keys( this.formGroup.controls).forEach(filed=>{
      const control=this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
  }
  gellAllSectors()
  {
this.sectorsData$=this._sectorsService.getAll();
  }
  createStartup(){
    this._startupsService.create(
      {
        name:this.formGroup.controls['name'].value,
        logo:this.formGroup.controls['logo'].value,
        city:this.formGroup.controls['city'].value,
        sectors:this.formGroup.controls['sectors'].value,
        numberOfEmployees:this.formGroup.controls['numberOfEmployees'].value,
        yearsOfEstablish:this.formGroup.controls['yearsOfEstablish'].value,
        websiteUrl:this.formGroup.controls['websiteUrl'].value,
        emailAddress:this.formGroup.controls['emailAddress'].value,
      }).then(()=>{
        this.location.back();
        Swal.fire(
          'Done!',
          'New startup has been created.',
          'success'
        )

      })
  }


  onFileInputChange($event:any)
  {
    this.formGroup.controls['logo'].setValue($event.target.files[0]);

//File Reader
  const reader =new FileReader();
  reader.onload=(event)=>(this.imgSrc=reader.result);
  reader.readAsDataURL(this.formGroup.controls['logo'].value)

  }

}
