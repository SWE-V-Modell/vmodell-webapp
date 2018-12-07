import { Component, OnInit, AfterContentInit, Input, OnChanges } from '@angular/core';
declare var Datamap: any;
declare var d3: any;

@Component({
  selector: 'stat-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() datas: any
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    document.getElementById('mapxx').innerHTML = ''
    var map = new Datamap({

      element: document.getElementById('mapxx'),
      projection: 'mercator',
      responsive: true,
      fills: {
        defaultFill: '#dddddd',
        heat1: "#FFEB3B",
        heat2: "#FFC107",
        heat3: "#FF9800",
        heat4: "#FF5722",
        heat5: "#E91E63",
        heat6: "#f44336"
      }, data: this.datas.data
      // {
      //   USA: { fillKey: "authorHasTraveledTo" },
      //   JPN: { fillKey: "authorHasTraveledTo" },
      //   ITA: { fillKey: "authorHasTraveledTo" },
      //   CRI: { fillKey: "authorHasTraveledTo" },
      //   KOR: { fillKey: "authorHasTraveledTo" },
      //   DEU: { fillKey: "authorHasTraveledTo" },
      // }
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

    var colors = d3.scale.category10();
  }
}