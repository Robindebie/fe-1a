"use strict";

const chartElement = document.getElementById("grade-graph");

// Data
const data = {
    labels: ["p1", "p2", "p3", "p4"],
    datasets: [
        {
            label: "Frontend",
            data: [6, 7, 8, 9],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        },
        {
            label: "Backend",
            data: [9, 8, 7, 6],
            borderColor: 'rgba(192, 75, 75, 1)',
            borderWidth: 1,
            fill: false
        }
    ]
};

// ChartArea Plugin
const chartArea = {
    id: 'chartArea',
    beforeDraw: function(chart, args, options) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const yScale = chart.scales.y; // y-axis scale
        const yValue = 5; // onvoldoende score op de Y-axis
        const yPixel = yScale.getPixelForValue(yValue); // get the pixel voor de score 5 waarde

        // Bewaar de staat van de context
        ctx.save();
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.setLineDash(options.borderDash);
        ctx.lineDashOffset = options.borderDashOffset;

        // Vul de rechthoek
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // rode kleur vulling, 0.5 opacity
        ctx.fillRect(chartArea.left, yPixel, chartArea.right - chartArea.left, chartArea.bottom - yPixel);

        // Voeg een dashed border toe aan de rechthoek
        ctx.strokeRect(chartArea.left, yPixel, chartArea.right - chartArea.left, chartArea.bottom - yPixel);
        ctx.restore();
    }
};

// Configuration
const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Periodes'
                }
            },
            y: {
                min: 0,
                max: 10,
                title: {
                    display: true,
                    text: 'Scores'
                }
            }
        },
        plugins: {
            chartArea: {
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
                borderDashOffset: 2,
            }
        }
    },
    plugins: [chartArea]
};

// Create the chart
const myChart = new Chart(
    chartElement,
    config
);