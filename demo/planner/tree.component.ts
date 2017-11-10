import { Component } from '@angular/core';

@Component({
  selector: 'planner-tree-view',
  template: `
      <div>
      <ngx-datatable
        [rows]="rows"
        [columns]="columns"
        [scrollbarH]="true">

        <ngx-datatable-column name="ID" width="100">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <strong>{{row['id']}}</strong>
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Title" width="1000">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <button
              [style.font-weight]="'bold'"
              [style.margin-left.px]="row['level'] * 50"
              (click)="addChild(row)"> + </button>
            <button [style.font-weight]="'bold'"
              (click)="removeChild(row)"> - </button>
            <div style="
              width: 300px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              display: inline;">
              {{row['title']}}
            </div>
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="State" width="100">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <strong>{{row['state']}}</strong>
          </ng-template>
        </ngx-datatable-column>

      </ngx-datatable>
    </div>
  `,
})
export class PlannerTreeComponent {

  rows = [];
  expanded = {};
  timeout: any;
  columns = [];
  lastID = 1697;

  constructor() {
    this.fetch((data) => {
      this.rows = data.data
        // .filter((d, i) => i < 15)
        .map((d, i) => {
          return {
            id: d.attributes['system.number'],
            title: d.attributes['system.title'],
            state: d.attributes['system.state'],
            level: 0
          };
        });
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/planner.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for(const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    return row.height;
  }

  addChild(row) {
    console.log(row);
    for (let k = 0; k < this.getRandomArbitrary(1, 5); k++) {
      const index = this.rows.findIndex(r => r.id === row.id);
      this.lastID += 1;
      const newEl = {
        id: this.lastID,
        title: row.title,
        state: row.state,
        level: row.level + 1
      };
      this.rows.splice(index + 1, 0, newEl);
    }
  }

  removeChild(row) {
    console.log(row);
    const index = this.rows.findIndex(r => r.id === row.id);
    while(this.rows[index + 1].level > row.level) {
      this.rows.splice(index + 1, 1);
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}
