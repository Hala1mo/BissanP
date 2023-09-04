import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input() graphData!: [{ label: string, y: number }];
  @Input() graphTitle: string = '';
  @Input() graphYTitle: string = ''
  @Input() graphBackground: string = '#FFFFFF';
  @Input() graphType: string = 'column';

  chart: any;
  chartOptions: any;

  ngOnInit(): void {
    this.chartOptions = {
      backgroundColor: this.graphBackground,
      animationEnabled: true,
      exportEnabled: false,
      axisY: {
        lineColor: '#f3f3f3',
        gridColor: 'rgba(204,204,204,0.5)',
        labelFontColor: '#FFFFFF',
        tickLength: 0,
      },
      axisX: {
        lineColor: '#f3f3f3',
        labelFontColor: '#FFFFFF',
        tickLength: 0,
      },
      toolTip: {
        fontColor: this.graphBackground
      },
      data: [{
        type: this.graphType,
        color: '#FFFFFF',
        dataPoints: this.graphData,
      }]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }


}
