import {Component, OnInit, Inject} from '@angular/core';

import {HttpService} from '../../services/http.service';
import {ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN} from '../../app.config';

import {Media} from '../../models/media';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  config: ApplicationConfig;
  displayedColumns: string[] = ['type', 'name', 'user', 'artist', 'season', 'episode', 'date', 'status', 'downloadedPercentage'];
  medias: Array<Media>;
  error: string = '';

  constructor(
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private httpService: HttpService
  ) {
    this.config = configuration;
  }

  ngOnInit() {
    this.httpService.get(this.config.apiEndpoint + "/media/list")
      .then(
        (data: Array<Media>) => {
          this.medias = data;
        },
        error => this.error = error.message
      )
  }

}
