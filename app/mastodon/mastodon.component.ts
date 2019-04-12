import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl } from "@angular/forms";
import { debounceTime}  from "rxjs/operators";
import MastodonAPI from '../../mastodon';
import { ChartsModalComponent } from "../charts-modal/charts-modal.component";
import { MatDialog } from "@angular/material";


let api: any;
let allToots: any[] = [];
const clientData: any = {
  clientId: '15f8126ea25479ac9d2e7535594b364a630cba6a6703a1f8ad4677159a31837e',
  clientSecret: '7962135318fe34020600621b974685a7e520d1a8832ff6e5d0b13b82424d6fe6',
  redirectUri: 'https://ashishdwivedi1909.github.io/polling-bot/home'
};

@Component({
  selector: 'app-mastodon',
  templateUrl: './mastodon.component.html',
  styleUrls: ['./mastodon.component.scss']
})
export class MastodonComponent implements OnInit {
  modalRef: any;
  toots: any[] = [];
  lastId: string = '';
  authCode: string = '';
  tagSearch = new FormControl('');
  correctAnswer = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    api = new MastodonAPI({
      instance: 'https://mastodon.akelius.io',
      api_user_token: 'e434590a5fe744cfbfa97f4059a00e437f7515f1776308bd57c85d89fa05bc44'
    });
    this.checkForAuthCode();
    this.getTimeLines();
    this.tagSearch.valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(
        value => {
          if (value !== '') {
            this.toots = [];
            this.lastId = '';
            this.getStatusesWithTag(value);
          } else {
            this.getTimeLines();
          }
        }
      );
    this.correctAnswer.valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(
        value => {
          if (value !== '') {
            this.toots = allToots;
            this.toots = this.toots.filter(toot => toot.content.toLowerCase().replace(/<[^>]*>/g, '').indexOf(value) >= 0);
          } else {
            this.getTimeLines();
          }
        }
      )
  }

  getStatusesWithTag(tag: string): void {
    api.get(
      'timelines/tag/' + tag,
      {
        limit: 40,
        max_id: this.lastId
      },
      data => {
        this.toots = this.toots.concat(data);
        allToots = this.toots;
        this.lastId = data[data.length - 1].id;
        if ((data.length > 1) &&  (data.length === 40)) {
          this.getStatusesWithTag(tag);
        }
      }
    );
  }

  getTimeLines(id?: string): void {
    api.get('timelines/public?local=true', { id, limit: 40 }, data => {
      this.toots = data
      allToots = this.toots;
    });
  }

  onTootCardClick(toot): void {
    api.post(`statuses/${toot.id}/reblog`);
  }

  onCloseClick(): void {
    this.tagSearch.setValue('', {
      onlySelf: true,
      emitEvent: false
    });
    this.getTimeLines();
  }

  onClearCorrectAnswer(): void {
    this.correctAnswer.setValue('', {
      onlySelf: true,
      emitEvent: false
    });
    this.getTimeLines();
  }

  onChartsClick(): void {
    this.modalRef = this.dialog.open(ChartsModalComponent, {
      width: '90vw',
      data: this.toots
    });
  }

  checkForAuthCode(): void {
    if (!this.route.snapshot.queryParams.code) {
      this.registerApplication();
    } else {
      this.authCode = this.route.snapshot.queryParams.code;
      localStorage.setItem('authCode', this.authCode)
    }
  }

  registerApplication(): void {
    api.registerApplication('polling-app',
      'https://ashishdwivedi1909.github.io/polling-bot/home',
      ['read', 'write', 'follow'],
      'https://mastodon.akelius.io',
      function(data) {
        localStorage.setItem('mastodon_client_id', data['client_id']);
        localStorage.setItem('mastodon_client_secret', data['client_secret']);
        localStorage.setItem('mastodon_client_redirect_uri', data['redirect_uri']);
        window.location.href = api.generateAuthLink(data['client_id'],
          data['redirect_uri'],
          'code',
          ['read', 'write', 'follow']
        );
      }
    );
  }

  setCode(authCode: string): void {
    // if (window.location.href.indexOf('?code=') !== -1) {
      api.getAccessTokenFromAuthCode(
        clientData.clientId,
        clientData.clientSecret,
        clientData.redirectUri,
        authCode,
        function(data) {
          console.log(data);
          // api.setConfig('api_user_token', tokenvar);
        }
      )
    }
  // }
}




// postStatus(): void {
//   api.post('statuses', { status: 'I\'m Mr. Meeseeks, look at me' }, function (data) {
//     console.log('Toot successful');
//   });
// }

// getProfile(): void {
//   api.get('accounts/1/following', {
//     since_id: 420,
//     max_id: 1337
//   }, function(data) {
//     // returns all users account id 1 is following in the id range from 420 to 1337
//     // you don't have to supply the parameters, you can also just go with .get(endpoint, callback)
//   });
// }

// initializeStream(): void {
//   //
//   // STREAMING
//   //
//   //lets initialize a stream! stream types are
//   // user for your local home TL and notifications
//   // public for your federated TL
//   // public:local for your home TL
//
//   api.stream('user', function(data) {
//     // data is an object containing two entries
//     // event determines which type of data you got
//     // payload is the actual data
//     // event can be notification or update
//     if (data.event === 'notification') {
//       // data.payload is a notification
//     } else if (data.event === 'update') {
//       // status update for one of your timelines
//     } else {
//       // probably an error
//     }
//   });
// }

//
// BASIC REST FUNCTIONS
// you can use every api endpoint from https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md
//

