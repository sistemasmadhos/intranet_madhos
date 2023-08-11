import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-links',
  templateUrl: './manage-links.component.html',
  styleUrls: ['./manage-links.component.css']
})
export class ManageLinksComponent implements OnInit {

  id: Number = 0;
  i: Number;
  links = [];
  currentL = null;
  name: string = '';
  link: string = '';
  fileToUpload: File = null;
  send = false;
  
  

  constructor(private documentsService: DocumentsService , private router: Router, private toastr: ToastrService) { }

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

  handleFileInput(event, files: FileList) {
    this.fileToUpload = files.item(0);
    var ext = this.fileToUpload.name.split('.').pop();
    if (!(ext=="jpg" || ext=="jpeg" || ext=="png" || ext=="gif")) {
      this.toastr.warning('La extensión del arhivo no es valida, deben ser imagenes', 'Extensión Archivo');
      this.fileToUpload = null;
    }
    // console.log('fileToUpload', this.fileToUpload);
  }


  createLink(){
    this.send = true;
    // console.log('title', this.title)
    // console.log('description', this.description)
    // console.log({ title:this.title, description:this.description, file:this.fileToUpload, type: this.type, interval: this.interval, color: this.color })
    if(this.name && this.link){ 
      this.documentsService.createLink({ id: this.id, name:this.name, link:this.link, file:this.fileToUpload }).subscribe(link => { 
        this.send = false;
        document.getElementById('btn-close').click();
        this.toastr.success('Se '+ (this.id ? 'edito' : 'creo') +' correctamente',this.id ? 'Editado' :  'Creado');
        if(this.id){
          this.currentL.name = this.name;
          this.currentL.link = this.link;
        } else
          this.links = link.concat(this.links);
        this.cerrar();
        return false;
      }, error => { 
        this.send = false;
        // console.log('error', error);
        if(error.status == 401){ 
          localStorage.clear();
          this.router.navigate(['./login']);
         }
        if(error.error)
          this.toastr.error('Error', error.error.message);
        else 
          this.toastr.error('Se presento un error , intente de nuevo por favor', 'Error');
         return false;
       });
     } else {
      this.toastr.info('Por favor llene todos los campos', 'Campos Requeridos');
      this.send = false;
    }
  }

  delete(id, i, name){
    this.id = id;
    this.i = i;
    this.name = name;
  }

  deleteLink(){
    if(this.id){
        this.documentsService.deleteLink({ 
          id:this.id
      }).subscribe(doc => { 
        this.links =  this.arrayRemove(this.links, this.i); 
        this.cerrar() 
        return false;
      });
    }
  }

  setLinkId(link){
    this.id = link.id;
    this.name = link.nombre;
    this.link = link.enlace;
    this.currentL = link;
    // console.log('this.documento', this.documento);
  }

  arrayRemove(arr, i) { 
    // console.log(arr,arr);
    var ind= -1;
    var temp = arr.filter (function () {
      ind++;
      return ind != i ? true : false;
    });
    return temp;
  }


  cerrar(){
    this.name = '';
    this.link = '';
    this.send = false;
    this.fileToUpload = null;
  }


}
