import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MagazineService} from '../service/magazine.service';
import {Magazine} from '../shared/magazine.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {
  magazines: Magazine[];
  pageNumber = 1;
  maxPages: number;
  working = false;
  magazinesSliced: Magazine[];
  createMode = false;
  @ViewChild('content') modal: ElementRef;
  constructor(private magazineService: MagazineService, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['mode'] === 'create') {
      this.createMode = true;
    } else if (this.activatedRoute.snapshot.params['mode'] !== 'view') {
      this.router.navigate(['']);
    }
    this.magazineService.getAllMagazines()
      .subscribe(
        (magazines: Magazine[]) => {
          this.magazines = magazines;
          this.sliceMagazines();
          this.maxPages = Math.ceil(this.magazines.length / 10);
        }
      );
  }

  nextPage() {
    this.pageNumber++;
    this.sliceMagazines();
  }
  previousPage() {
    this.pageNumber--;
    this.sliceMagazines();
  }
  sliceMagazines() {
    if (this.magazines.length >= this.pageNumber * 10 ) {
      this.magazinesSliced = this.magazines.slice((this.pageNumber - 1) * 10 , this.pageNumber * 10);
    } else {
      this.magazinesSliced = this.magazines.slice((this.pageNumber - 1) * 10 , this.magazines.length);
    }
  }
  startProcess(selectedIndex: number) {
    this.working = !this.working;
    const magazineId = this.magazinesSliced[selectedIndex].id;
    this.magazineService.startProcess(magazineId)
      .subscribe(
        (res) => {
          this.working = !this.working;
          this.open(this.modal);
        }
      );
  }
  open(content) {
    // noinspection JSAnnotator
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      console.log('closed');
    }, (reason) => {
        this.magazineService.appendTask.next(true);
        this.router.navigate(['']);
      });
  }
}
