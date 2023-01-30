import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { UploadSectorService } from 'src/app/core/services/upload-sector.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent implements OnInit ,OnDestroy {
  private closer$=new Subject<void>();
  key:string='';
  formGroup:FormGroup;
  imgSrc='https://firebasestorage.googleapis.com/v0/b/jordanministryofdigitaleconomy.appspot.com/o/JMODE%2Fcloud-upload-a30f385a928e44e199a62210d578375a.webp?alt=media&token=645f3d0f-825e-4319-8f91-8464d599987d';

  constructor(private activatedRoute:ActivatedRoute,
    private _sectorsService:SectorsService,
    private formBuilder:FormBuilder,
    private _uploadSectorService:UploadSectorService,
    private location:Location)
    {
      this.formGroup=this.formBuilder.group({
        name:[null,[Validators.required]],
         logo:null,
         designColor:null,
         parentCategoryName:null,
      });


    }
  ngOnDestroy(): void {
    if(this.closer$)
    {
      this.closer$.next();
      this.closer$.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.pipe(takeUntil(this.closer$)).subscribe((result)=>{
      if(result['key'])
      {
        this.key=result['key'];
        this.getDataById();

      }
    })
  }
  getDataById()
  {
    this._sectorsService.getById(this.key).pipe(takeUntil(this.closer$)).subscribe((result:any)=>{
      this.formGroup=this.formBuilder.group({
        name:[result['name'],[Validators.required]],
        logo:result['logo'],
        designColor:result['designColor'],
        parentCategoryName:result['parentCategoryName'],
      })
      if(result['logo'])
      {
        this.imgSrc=result['logo'];

      }
      else
      {
        this.imgSrc='https://firebasestorage.googleapis.com/v0/b/jordanministryofdigitaleconomy.appspot.com/o/JMODE%2Fcloud-upload-a30f385a928e44e199a62210d578375a.webp?alt=media&token=645f3d0f-825e-4319-8f91-8464d599987d';

      }


    });

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
      if(this.formGroup.controls['logo'].value)
      {
        this.upload();
      }
      else{
        this.updateSector();

      }
    }

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
  getDownloadURL()
  {
    this._uploadSectorService.getDownloadURL().pipe(takeUntil(this.closer$)).subscribe((url)=>{
      this.formGroup.controls['logo'].setValue(url);
      this.updateSector();
    });


  }
  validateFormGroup()
  {
    Object.keys( this.formGroup.controls).forEach(filed=>{
      const control=this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
  }
  updateSector(){
    this._sectorsService.update(this.key,
      {
        name:this.formGroup.controls['name'].value,
        logo:this.formGroup.controls['logo'].value,
        designColor:this.formGroup.controls['designColor'].value,
        parentCategoryName:this.formGroup.controls['parentCategoryName'].value,

      }).then(()=>{
        Swal.fire(
          'Done!',
          'Your sector has been updated.',
          'success'
        )
        this.location.back();
      })
      this.imgSrc=this.formGroup.controls['logo'].value;

  }
  onFileInputChange($event:any)
  {
    this.formGroup.controls['logo'].setValue($event.target.files[0]);

//File Reader
  const reader =new FileReader();
  reader.onload=(event)=>(this.imgSrc=reader.result as string);
  reader.readAsDataURL(this.formGroup.controls['logo'].value)

  }

}
