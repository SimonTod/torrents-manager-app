import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '../../services/http.service';
import { ApplicationConfig, MY_CONFIG_TOKEN } from '../../app.config';

import { MediaType } from '../../models/media';

@Component({
  selector: 'app-media-create',
  templateUrl: './media-create.component.html',
  styleUrls: ['./media-create.component.css']
})
export class MediaCreateComponent implements OnInit {
  config: ApplicationConfig;
  mediaTypes: Array<MediaType>;
  error: string = '';
  form: FormGroup;

  @Output() created = new EventEmitter<string>();

  constructor(
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private httpService: HttpService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { 
    this.config = configuration;
  }

  ngOnInit() {
    this.httpService.get(this.config.apiEndpoint + "/media/types/list")
    .then(
      (data: Array<MediaType>) => {
        this.mediaTypes = data;
      },
      error => this.error = error.message
    )
  }

  openModal(content) {
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
      'type': ['', Validators.required],
      'torrent_url': ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      // 'artist': [''],
      // 'season': [''],
      // 'episode': ['']
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.error = '';
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.error = '';
    });
  }

  create() {
    this.error = '';
    this.httpService.post(
      this.config.apiEndpoint + "/media/create", 
      { 
        name: this.form.value.name,
        type: this.form.value.type,
        torrent_url: this.form.value.torrent_url
      }
    ).then(
      (data: any) => {
        this.modalService.dismissAll("User created a media successfully");
        this.created.next();
      },
      (error: HttpErrorResponse) => {
        switch(error.status) {
          case 401:
            this.error = "Ce nom existe déjà.";
            break;
          case 402:
            this.error = "Cette url existe déjà.";
            break;
          default:
            this.error = "Une erreur est survenue, veillez réessayer.";
            break;
        }
      }
    );
  }

}
