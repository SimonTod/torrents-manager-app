import {Component, OnInit, Inject, ViewChild, Input} from '@angular/core';
import {MatSort, MatTableDataSource, MatSortable} from '@angular/material'
import {environment} from '../../../environments/environment';

import {HttpService} from '../../services/http.service';

import {Media} from '../../models/media';
import {User} from '../../models/user';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  displayedColumns: string[] = ['type', 'name', 'user', 'artist', 'season', 'episode', 'date', 'status', 'downloadedPercentage', 'votes', 'comments'];
  medias: MatTableDataSource<Media>;
  error: string = '';

  @Input() currentUser: User;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.error = '';
    this.getData(true);
  }

  getData(shouldInitiateTable: boolean) {
    this.error = '';
    this.httpService.get(environment.apiEndpoint + "/media/list")
      .then(
        (data: Array<Media>) => {
          if (shouldInitiateTable) {
            this.medias = new MatTableDataSource(data);
            this.medias.sort = this.sort;
            this.medias.sort.sort({id: 'date', start: 'desc', disableClear: false});
          } else {
            this.medias.data = data;
          }
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

  vote(media: Media) {
    this.httpService.post(environment.apiEndpoint + "/media/" + media.id + "/vote", null)
      .then(
        (data: Media) => {
          this.getData(false);
        },
        error => this.error = error.message
      )
  }

  deleteVote(media: Media) {
    this.httpService.delete(environment.apiEndpoint + "/media/" + media.id + "/vote")
      .then(
        (data: Media) => {
          this.getData(false);
        },
        error => this.error = error.message
      )
  }

  userHasVoted(media: Media) {
    let currentUser= this.currentUser;
    return media.votes.find(function(element){
      return element.id == currentUser.id;
    })
  }
}
