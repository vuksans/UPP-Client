import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionBase} from '../../../shared/question-base.model';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from '../../../service/QuestionControlService';
import {TasksService} from '../../../service/tasks.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {MagazineService} from '../../../service/magazine.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  questions: QuestionBase<any>[] = [];
  form: FormGroup = new FormGroup({});
  taskId: string;
  selectedFile: File;
  working = false;
  needPdf = false;
  @ViewChild('content') modal: ElementRef;
  constructor(private questionControlService: QuestionControlService,
              private tasksService: TasksService,
              private modalService: NgbModal,
              private router: Router,
              private magazineService: MagazineService) {
    this.tasksService.selectedFile.subscribe(
      (file: File) => {
        this.selectedFile = file;
        console.log(this.selectedFile);
      }
    );
  }

  ngOnInit() {
    this.questionControlService.questionsChanged.subscribe(
      (newQuestions: QuestionBase<any>[]) => {
        this.questions = newQuestions;
        this.form = this.questionControlService.toFormGroup(this.questions);
      }
    );
    this.tasksService.selectedTask.subscribe(
      (taskId: string) => {
        this.taskId = taskId;
      }
    );
  }
  onSubmit() {
    this.working = !this.working;
    if (this.selectedFile != null) {
      const fileData = new FormData();
      fileData.append('pdf', this.selectedFile);
      this.tasksService.uploadPdf(fileData, this.taskId)
        .subscribe(
          (res) => {
            this.tasksService.executeTask(this.form.value, this.taskId)
              .subscribe(
                (response) => {
                  this.working = !this.working;
                  this.open(this.modal);
                }
              );
          }
        );
    } else {
      this.tasksService.executeTask(this.form.value, this.taskId)
        .subscribe(
          (res) => {
            this.working = !this.working;
            this.open(this.modal);
          }
        );
    }
  }
  open(content) {
    // noinspection JSAnnotator
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        console.log('closed');
      }, (reason) => {
        this.magazineService.appendTask.next(false);
        this.router.navigate(['']);
      });
  }
}
