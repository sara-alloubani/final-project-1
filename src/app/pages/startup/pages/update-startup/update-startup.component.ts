import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StartupsService } from 'src/app/core/services/startups.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Location } from '@angular/common';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { Sectors } from 'src/app/core/interfaces/sectors.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-startup',
  templateUrl: './update-startup.component.html',
  styleUrls: ['./update-startup.component.css']
})
export class UpdateStartupComponent implements OnInit {
  key:string='';
  formGroup:FormGroup;
  imgSrc:any;
  sectorsData$:any;
  constructor(private activatedRoute:ActivatedRoute,
    private _startupService:StartupsService,
    private formBuilder:FormBuilder,
    private _uploadService:UploadService,
    private location:Location,
    private _sectorsService:SectorsService) {
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
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key'])
      {
        this.key=result['key'];
        this.getDataById();
        this.getAllSectors();

      }
    })
  }
  getAllSectors()
  {

this.sectorsData$=this._sectorsService.getAll();

  }

  getDataById()
  {
    this._startupService.getById(this.key).subscribe((result:any)=>{
      this.formGroup=this.formBuilder.group({
        name:[result['name'],[Validators.required]],
         logo:result['logo'],
         city:result['city'],
         sectors:[result['sectors'],[Validators.required]],
         numberOfEmployees:result['numberOfEmployees'],
         yearsOfEstablish:result['yearsOfEstablish'],
         websiteUrl:[result['websiteUrl'],[Validators.required]],
         emailAddress:[result['emailAddress'],[Validators.email,Validators.required]],

      })
      this.imgSrc=result['logo'];

    });

  }
  compare(o1: Sectors, o2: Sectors): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.name === o2.name : o2 === o2;
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

  onUpdateclicked()
  {
    if(this.formGroup.invalid)
    {
      this.validateFormGroup()

    }
    else
    {
      if(this.formGroup.controls['logo'].value.name)
      {
        this.upload();

      }
      else{
        this.updateStartup();

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
      this.updateStartup();
    });


  }
  validateFormGroup()
  {
    Object.keys( this.formGroup.controls).forEach(filed=>{
      const control=this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
  }
  updateStartup(){
    this._startupService.update(this.key,
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
        Swal.fire(
          'Done!',
          'Your startup has been updated.',
          'success'
        )
        this.location.back();

      });
      this.imgSrc=this.formGroup.controls['logo'].value;
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
