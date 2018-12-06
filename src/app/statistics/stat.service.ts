import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  constructor() { }

  generateUserNumbers(): LineChartData[] {
    var values = [
      { name: 'Angemeldete Nutzer', factor: 15, start: 3652, color: '#428BCA' },
      { name: 'Nutzer online', factor: 5, start: 142, color: '#5CB85C' },
      { name: 'Blockierte Nutzer', factor: 10, start: 2352, color: '#D9534F' }
    ];

    var datas: LineChartData[] = [];
    for (let v of values) {
      datas.push(this.generateLineChartData(v.name, 10, v.factor, v.start, v.color));
    }
    return datas;
  }

  generateLineChartData(name: string, entries: number, factor: number, start: number, color: string): LineChartData {
    var data: LineChartData = { name: name, series: [], color: color }
    for (let i = 0; i < entries; i++) {
      // dont ask
      data.series.push({
        name: this.getDate(-entries + i),
        value: this.getRandom(start,
          data.series.length > 0
            ? this.getRandom(data.series[data.series.length - 1].value, data.series[this.getRandom(0, data.series.length - 1)].value * factor)
            : this.getRandom(start, start * Math.PI)
        )
      })
    }
    data.series.push()
    return data;
  }

  private getDate(dFromNow: number): string {
    const d = new Date();
    d.setDate(d.getDate() + dFromNow);
    return [d.getDate(), d.getMonth() + 1,].join('.');
  }

  private getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
