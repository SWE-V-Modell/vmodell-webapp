import { Component, OnInit, AfterContentInit, Input, OnChanges } from '@angular/core';
declare let Datamap: any;
declare let d3: any;

@Component({
  selector: 'app-stat-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() datas: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    document.getElementById('mapxx').innerHTML = '';
    const map = new Datamap({
      element: document.getElementById('mapxx'),
      projection: 'mercator',
      responsive: true,
      fills: {
        defaultFill: '#dddddd',
        heat1: '#FFEB3B',
        heat2: '#FFC107',
        heat3: '#FF9800',
        heat4: '#FF5722',
        heat5: '#E91E63',
        heat6: '#f44336'
      }, data: this.datas.data
    });
    window.addEventListener('resize', function () {
      map.resize();
    });

    map.arc(
      this.datas.arcs, {
        greatArc: true,
        animationSpeed: 2000
      }
    );

    map.resize();

    const colors = d3.scale.category10();
  }
}
