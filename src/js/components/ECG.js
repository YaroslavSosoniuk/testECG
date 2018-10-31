import React, {createRef} from 'react';
import './ecg.css';

export default class ECG extends React.Component {


    constructor(props) {

        super(props);
        this.canvasElement = createRef();
        this.drawChart = this.drawChart.bind(this);
        this.animateContext = this.animateContext.bind(this);

    }

    componentDidMount() {

        fetch('https://reportservice.mawihealth.com/ecg/')
            .then(res => res.json())
            .then(result =>
            {
                this.points = result;
                this.drawChart(this.points);
            });


    }

    drawChart (points){

        console.log(points);
        if(typeof points !== 'object') { return };
        this.canvasHeight = this.canvasElement.current.clientHeight;
        this.canvasWidth = this.canvasElement.current.clientWidth;
        let maxValue = Math.max.apply(null, points);
        let minValue = Math.min.apply(null, points);
        this.verticalCoef = this.canvasHeight/maxValue;
        this.ctx = this.canvasElement.current.getContext('2d');
        this.ctx.fillStyle = '#000000';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.startPoint = 0;
        this.canAnimate = true;
        this.animateContext();

    }

    animateContext() {

        if (this.startPoint > this.points.length - 1) {
            return;
        }

        if (this.canAnimate) {
            requestAnimationFrame(this.animateContext);
        }

        if (this.startPoint++ < this.canvasWidth) {
            this.ctx.beginPath();
            this.ctx.moveTo( this.startPoint-1,this.points[this.startPoint-1]*this.verticalCoef );
            this.ctx.lineTo(this.startPoint, this.points[this.startPoint]*this.verticalCoef);
            this.ctx.stroke();
        } else {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            for (let xx = 0; xx < this.canvasWidth; xx++) {
                this.ctx.beginPath();
                if(xx == 0){
                    this.ctx.moveTo(0,0);
                } else {
                    this.ctx.moveTo(xx-1,this.points[this.startPoint - this.canvasWidth + xx - 1]*this.verticalCoef )
                }
                let y = this.points[this.startPoint - this.canvasWidth + xx]*this.verticalCoef;
                this.ctx.lineTo(xx, y);
                this.ctx.stroke();
            }

        }

    }

    render() {

        return(
            <div className='canvas__wrapper'>
                <canvas id='canvas' ref={this.canvasElement}></canvas>
            </div>
        )

    }

}