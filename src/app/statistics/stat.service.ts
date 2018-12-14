import { Injectable } from '@angular/core';
import { countries } from './countries';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private fills = ['heat1', 'heat2', 'heat3', 'heat4', 'heat5', 'heat6'];
  constructor() { }

  generateUserNumbers(): LineChartData[] {
    const values = [
      { name: 'Angemeldete Nutzer', factor: 4, start: 36524, color: '#428BCA' },
      { name: 'Nutzer online', factor: 2, start: 1452, color: '#5CB85C' },
      { name: 'Blockierte Nutzer', factor: 3, start: 2352, color: '#D9534F' }
    ];

    const datas: LineChartData[] = [];
    for (const v of values) {
      datas.push(this.generateLineChartData(v.name, 15, v.factor, v.start, v.color));
    }
    return datas;
  }

  generateLineChartData(name: string, entries: number, factor: number, start: number, color: string): LineChartData {
    const data: LineChartData = { name: name, series: [], color: color };
    for (let i = 0; i < entries; i++) {
      // dont ask
      data.series.push({
        name: this.getDate(-entries + i),
        value: this.getRandom(start,
          data.series.length > 0
            ? this.getRandom(
              data.series[data.series.length - 1].value,
              data.series[this.getRandom(0, data.series.length - 1)].value * factor)
            : this.getRandom(start, start * Math.PI)
        )
      });
    }
    data.series.push();
    return data;
  }

  private getDate(dFromNow: number): string {
    const d = new Date();
    d.setDate(d.getDate() + dFromNow);
    return [d.getDate(), d.getMonth() + 1, ''].join('.');
  }

  private getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomFloat(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
  }

  generateMap(count: number) {
    if (count > countries.length)
      count = countries.length - 2;
    const c = [];
    for (const cr of countries) { c.push(cr); }
    const arcs = [];
    const data = {};

    for (let i = 0; i < count; i++) {
      const country = c.splice(this.getRandom(0, c.length - 1), 1)[0];
      data[country.code] = {};
      data[country.code]['fillKey'] = this.fills[this.getRandom(0, this.fills.length - 1)];
      arcs.push({
        origin: {
          longitude: country.longitude,
          latitude: country.latitude,
        },
        destination: {
          longitude: 8.715870,
          latitude: 51.715290,
        }
      });
    }
    return { data: data, arcs: arcs };
  }
}
