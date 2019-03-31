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
    this.initForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.error = '';
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.error = '';
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      'name': [null, Validators.required],
      'type': ['movie', Validators.required],
      'torrent_url': [null, [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)]],
      'artist': [null],
      'serie_complete': [null],
      'season': [null],
      'season_complete': [null],
      'episode': [null]
    });
    const typeControl = this.form.get('type');
    const artistControl = this.form.get('artist');
    const serieCompleteControl = this.form.get('serie_complete');
    const seasonControl = this.form.get('season');
    const seasonCompleteControl = this.form.get('season_complete');
    const episodeControl = this.form.get('episode');
    typeControl.valueChanges
      .subscribe(type => {
        artistControl.setValue(null);
        serieCompleteControl.setValue(null);
        seasonControl.setValue(null);
        seasonCompleteControl.setValue(null);
        episodeControl.setValue(null);
        switch(type) {
          case 'movie':
          case 'other':
            artistControl.setValidators(null);
            seasonControl.setValidators(null);
            episodeControl.setValidators(null);
            break;
          case 'music':
            artistControl.setValidators([Validators.required]);
            seasonControl.setValidators(null);
            episodeControl.setValidators(null);
            break;
          case 'serie':
            artistControl.setValidators(null);
            seasonControl.setValidators([Validators.required, Validators.min(0)]);
            episodeControl.setValidators([Validators.required, Validators.min(0)]);
            break;
        }
        artistControl.updateValueAndValidity();
        serieCompleteControl.updateValueAndValidity();
        seasonControl.updateValueAndValidity();
        seasonCompleteControl.updateValueAndValidity();
        episodeControl.updateValueAndValidity();
      }
    );
    serieCompleteControl.valueChanges
      .subscribe(serieComplete => {
        if (!serieComplete && typeControl.value == 'serie') {
          seasonControl.setValue(null);
          seasonControl.setValidators([Validators.required, Validators.min(0)]);
          seasonCompleteControl.setValue(null);
          seasonCompleteControl.setValidators(null);
          episodeControl.setValue(null);
          episodeControl.setValidators([Validators.required, Validators.min(0)]);
        } else {
          seasonControl.setValue(null);
          seasonControl.setValidators(null);
          seasonCompleteControl.setValue(null);
          seasonCompleteControl.setValidators(null);
          episodeControl.setValue(null);
          episodeControl.setValidators(null);
        }
        seasonControl.updateValueAndValidity();
        seasonCompleteControl.updateValueAndValidity();
        episodeControl.updateValueAndValidity();
      }
    );
    seasonCompleteControl.valueChanges
      .subscribe(seasonComplete => {
        if (!seasonComplete && typeControl.value == 'serie' && !serieCompleteControl) {
          episodeControl.setValue(null);
          episodeControl.setValidators([Validators.required, Validators.min(0)]);
        } else {
          episodeControl.setValue(null);
          episodeControl.setValidators(null);
        }
        episodeControl.updateValueAndValidity();
      }
    );
  }

  create() {
    this.error = '';
    this.httpService.post(
      this.config.apiEndpoint + "/media/create", 
      { 
        name: this.form.value.name,
        type: this.form.value.type,
        torrent_url: this.form.value.torrent_url,
        artist: this.form.value.artist,
        season: this.form.value.season,
        episode: this.form.value.episode
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
