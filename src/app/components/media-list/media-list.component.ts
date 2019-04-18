import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatSortable} from '@angular/material'
import {environment} from '../../../environments/environment';

import {HttpService} from '../../services/http.service';

import {Media} from '../../models/media';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  displayedColumns: string[] = ['type', 'name', 'user', 'artist', 'season', 'episode', 'date', 'status', 'downloadedPercentage'];
  medias: MatTableDataSource<Media>;
  error: string = '';

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.httpService.get(environment.apiEndpoint + "/media/list")
      .then(
        (data: Array<Media>) => {
          this.medias = new MatTableDataSource(data);
          this.medias.sort = this.sort;
          this.medias.sort.sort({id: 'date', start: 'desc', disableClear: false});
        },
        error => this.error = error.message
      )
  }

  applyFilter(filterValue: string) {
    this.medias.filter = filterValue.trim().toLowerCase();

    if (this.medias.paginator) {
      this.medias.paginator.firstPage();
    }
  }

}
