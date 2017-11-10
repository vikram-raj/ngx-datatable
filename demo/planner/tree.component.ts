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
            <div style="width: 300px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
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
  styles: [`.arrow-down {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;

    border-top: 20px solid #f00;
  }

  .arrow-right {
    width: 0;
    height: 0;
    border-top: 60px solid transparent;
    border-bottom: 60px solid transparent;

    border-left: 60px solid green;
  }`]
})
export class PlannerTreeComponent {

  rows = [];
  expanded = {};
  timeout: any;
  columns = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data.data.map(d => {
        return {
          id: d.attributes['system.number'],
          title: d.attributes['system.title'],
          state: d.attributes['system.state']
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

}
