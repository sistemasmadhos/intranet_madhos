import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';
import { environment } from '../../../../src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-full-index',
  templateUrl: './full-index.component.html',
  styleUrls: ['./full-index.component.css']
})
export class FullIndexComponent implements OnInit {
  
  anounces = [];
  host: string  = environment.api_url;

  constructor(private documentsService: DocumentsService , private router: Router) { }

  ngOnInit() {
    var am = this;

    // $('.carousel').carousel({
    //   interval: 2000 
    // });

    // $('video').on('play', function(e) { 
    //   $(this).focus();
    // })

    // console.log('epale');
    this.documentsService.fetctAnuncios().subscribe(documents => {
      console.log('anoun', documents);
      am.anounces = documents;
      console.log(am.anounces);
     
    }, error => { 
      if(error.status == 401){ 
        localStorage.clear();
        am.router.navigate(['./login']);
       }
    })

    setInterval(function() {
      var e = new IntersectionObserver(function(e, t) {
        e.forEach(function(e) {
            e.isIntersecting ? (e.target as HTMLMediaElement ).play() : (e.target as HTMLMediaElement).pause();
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 1
    });
    
    document.querySelectorAll("video").forEach(function(t) {
        e.observe(t);
    });
    },  5000);
   
    
    // window.addEventListener('load', function() {
    //   am.videoObserver();
    //   alert('SE ACTIVA EL SELETC');
    // })
    // this.handleVids();

    // $("#carouselExampleControls").on('slid.bs.carousel', function (e) {
      // var ind = $('#carouselExampleControls .active').index('#carouselExampleControls .carousel-item');
      // console.log('Index', ind);
      // am.handleVids();
      // console.log('vids', vids);
      // if(vids.length > 0){
      //    vids[0].pause();
      //    if(ind == 1){
      //     vids[0].play();
      //    }
      // }
    // })
  }

  videoObserver(){
    var e = new IntersectionObserver(function(e, t) {
        e.forEach(function(e) {
            e.isIntersecting ? (e.target as HTMLMediaElement ).play() : (e.target as HTMLMediaElement).pause();
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 1
    });
    document.querySelectorAll("video").forEach(function(t) {
        e.observe(t);
    });
  }

  handleVids(){
    var vids = $("#carouselExampleControls video");
      vids.each(function( index, value ) {
        value.play();
        console.log($(this).is(":visible"));
        if($(this).is(":visible"))
          value.play();
        else 
          value.pause();
      });
  }

  continue(){
    document.getElementById("carousel-next").click();
  }

}
