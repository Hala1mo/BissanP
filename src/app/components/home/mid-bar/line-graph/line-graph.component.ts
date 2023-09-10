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
  @Input() lineColor: string = '#f3f3f3'
  @Input() graphType: string = 'column';

  chart: any;
  chartOptions: any;

  ngOnInit(): void {
    this.chartOptions = {
      backgroundColor: this.graphBackground,
      animationEnabled: true,
      exportEnabled: false,
      axisY: {
        lineColor: this.lineColor,
        labelFontColor: this.lineColor,
        gridColor: 'rgba(204,204,204,0.5)',
        tickLength: 0,
      },
      axisX: {
        lineColor: this.lineColor,
        labelFontColor: this.lineColor,
        tickLength: 0,
      },
      toolTip: {
        fontColor: this.graphBackground === '#FFFFFF' ? this.lineColor : this.graphBackground
      },
      data: [{
        type: this.graphType,
        color: this.lineColor,
        dataPoints: this.graphData,
      }]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }


}
