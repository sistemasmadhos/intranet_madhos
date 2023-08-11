import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { Router } from '@angular/router';
import { resAreas } from '../../models/resAreas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  areas: resAreas[];

  constructor(private documentsService: DocumentsService, private router: Router) { }

  changeAreaName(areaName:string, areaId:number){
    this.router.navigate(['./documentos']);
    this.documentsService.changeAreaName(areaName);
    this.documentsService.changeAreaId(areaId);    
  }

  getRol(){
    return localStorage.getItem('intrnaet-rol');
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['./login']);
  }

  ngOnInit() {
    this.documentsService.fetchAreas().subscribe(areas => { this.areas = areas; }, error => { 
      if(error.status == 401){ 
        localStorage.clear();
        this.router.navigate(['./login']);
       }
     });
  };

}
