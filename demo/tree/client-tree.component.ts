import { Component } from '@angular/core';

@Component({
  selector: 'client-side-tree-demo',
  template: `
    <div>
      <h3>
        Flex Column Width Distribution
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/columns/column-flex.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [columnMode]="'flex'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [treeFromRelation]="'manager'"
        [treeToRelation]="'name'"
        [rows]="rows"
        (treeAction)="onTreeAction($event)">
        <ngx-datatable-column name="Name" [flexGrow]="3" [isTreeColumn]="true">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>

          <ng-template ngx-datatable-cell-tree-expander>
            <img
              [ngClass]="['icon']"
              src="https://png.icons8.com/android/540/expand-arrow.png" />
          </ng-template>

          <ng-template ngx-datatable-cell-tree-collapser>
            <img
              [ngClass]="['icon']"
              src="https://png.icons8.com/android/540/collapse-arrow.png" />
          </ng-template>

          <ng-template ngx-datatable-cell-tree-disabled>
            <img
              [ngClass]="['icon', 'disabled']"
              src="https://png.icons8.com/android/540/collapse-arrow.png" />
          </ng-template>

        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" [flexGrow]="1">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" [flexGrow]="1">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `,
  styles: [
    '.icon {height: 10px; width: 10px; }',
    '.disabled {opacity: 0.5; }'
  ],

})
export class ClientTreeComponent {

  rows = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company_tree.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (this.rows[index].treeStatus === 'collapsed') {
      this.rows[index].treeStatus = 'expanded';
    } else {
      this.rows[index].treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }

}
