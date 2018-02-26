import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {SelectionModel} from '@angular/cdk/collections';
import {ShortVisit} from '../item/short-visit';
import {ShortVisitsService} from '../service/short-visits.service';

@Component({
  selector: 'app-visitstable',
  templateUrl: './visitstable.component.html',
  styleUrls: ['./visitstable.component.css']
})
export class VisitstableComponent implements OnDestroy, OnInit {
  sub: Subscription;
  displayedColumns = ['Select', 'Doctor', 'Patient', 'Disease', 'Date'];
  dataSource: MatTableDataSource<ShortVisit>;
  selection: SelectionModel<ShortVisit>;
  visits: ShortVisit[];
  butEditEn = false;
  butDelEn = false;
  selectedId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private svService: ShortVisitsService) {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<ShortVisit>(allowMultiSelect, initialSelection);
    this.selectedId = null;
  }

  ngOnInit() {
    this.sub = this.svService.getShortVisits().subscribe(elements => {
      this.visits = elements;
      this.dataSource = new MatTableDataSource(elements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delButton() {
    for (const entry of this.selection.selected) {
      this.visits = this.visits.filter(h => h !== entry);
      this.dataSource.data = this.dataSource.data.filter(h => h !== entry);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection.clear();
      this.svService.deleteVisit(entry.idVisit).subscribe();
    }
  }

  myToggle(row) {
    this.selection.toggle(row);
    if (this.isOneSelected()) {
      this.butEditEn = true;
      this.selectedId = this.selection.selected[0].idVisit;
    } else {
      this.butEditEn = false;
      this.selectedId = 0;
    }
    if (this.isAnySelected()) { this.butDelEn = true; } else { this.butDelEn = false; }
  }

  editVisitClick(row) {
    console.log( 'edit ' + row.idVisit + ' row' );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isOneSelected() {
    return 1 === this.selection.selected.length;
  }

  isAnySelected() {
    return this.selection.selected.length > 0;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    if (this.isOneSelected()) {
      this.butEditEn = true;
      this.selectedId = this.selection.selected[0].idVisit;
    } else {
      this.butEditEn = false;
      this.selectedId = 0;
    }
    if (this.isAnySelected()) { this.butDelEn = true; } else { this.butDelEn = false; }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
