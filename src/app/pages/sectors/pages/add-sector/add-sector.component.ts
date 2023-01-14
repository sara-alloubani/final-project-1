import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { Location } from '@angular/common';
import { UploadSectorService } from 'src/app/core/services/upload-sector.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent implements OnInit {
  formGroup:FormGroup;
  imgSrc:any;
  color: string = "#127bdc";
  constructor(private formBuilder:FormBuilder,
    private location:Location,
    private _sectorsService:SectorsService,
    private _uploadSectorService:UploadSectorService)

  {
      this.formGroup=this.formBuilder.group({
        name:[null,[Validators.required]],
         logo:null,
         designColor:null,
         parentCategoryName:null,
      });
     }

  ngOnInit(): void {
  }

  getErrorMessage(control:any)
  {
    if(control.hasError('required'))
    {
      return 'You must enter a value';
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
        this.createSector();

      }
    }

  }

  validateFormGroup()
  {
    Object.keys( this.formGroup.controls).forEach(filed=>{
      const control=this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
  }
  upload()
  {

    this._uploadSectorService.
    upload(this.formGroup.controls['logo'].value)
    .subscribe((file)=>{
      if(file?.metadata)
      {
        this.getDownloadURL();

      }

    })

  }

  createSector(){
    this._sectorsService.create(
      {
        name:this.formGroup.controls['name'].value,
        logo:this.formGroup.controls['logo'].value,
        designColor:this.formGroup.controls['designColor'].value,
        parentCategoryName:this.formGroup.controls['parentCategoryName'].value,


      }).then(()=>{
        Swal.fire(
          'Done!',
          'New sector has been created.',
          'success'
        )
        this.location.back();

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
  getDownloadURL()
  {
    this._uploadSectorService.getDownloadURL().subscribe((url)=>{
      this.formGroup.controls['logo'].setValue(url);
      this.createSector();
    });


  }
}
