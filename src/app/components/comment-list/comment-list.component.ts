import {Component, Input, OnInit, Inject} from '@angular/core';
import {Media, MediaType} from "../../models/media";
import {Comment} from '../../models/comment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() media: Media;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  openModal() {
    const dialogRef = this.dialog.open(CommentListDialog, {
      width: '600px',
      data: this.media
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result == CREATED) {
      //   this.created.next();
      // }
    });
  }

}

@Component({
  selector: 'comment-list-dialog',
  templateUrl: 'media-list-dialog.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListDialog {
  media: Media;
  form: FormGroup;
  error: string = '';

  constructor(
    public dialogRef: MatDialogRef<CommentListDialog>,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: Media
  ) {
    this.media = data;
    this.initForm();
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.form = this.formBuilder.group({
      'text': [null, Validators.required]
    });
  }

  create() {
    this.error = '';
    this.httpService.post(
      environment.apiEndpoint + "/media/" + this.media.id + "/comment",
      {
        text: this.form.value.text,
      }
    ).then(
      (data: Comment) => {
        this.form.get("text").setValue("");
        this.media.comments.push(data);
      },
      (error: HttpErrorResponse) => {
        this.error = "Une erreur est survenue, veillez réessayer.";
      }
    );
  }

}
