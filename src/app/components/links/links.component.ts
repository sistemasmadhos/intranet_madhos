import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  links = [];

  constructor(private documentsService: DocumentsService, private router: Router) { }

  ngOnInit() {
    this.documentsService.fetctLinks().subscribe(liks => {
      this.links = liks;
      // console.log(this.links);
    }, error => {
      if(error.status == 401){ 
        localStorage.clear();
        this.router.navigate(['./login']);
       }
    })
  }

}
