const colors = {
	primary: '#007bff',
	success: '#17c671',
	warning: '#ffb400',
	salmon: '#ff4169',
	secondary: '#5a6169',
	info: '#00b8d8',
	java: '#1adba2',
	royalblue: '#674eec',
	yellow: '#e4d354',
	reagentgray: '#818ea3',
	carnation: '#f45b5b',
	riptide: '#91e8e1',
	gray: '#868e96',
	gray100: '#f8f9fa',
	gray200: '#e9ecef',
	gray300: '#dee2e6',
	gray400: '#ced4da',
	gray500: '#adb5bd',
	gray600: '#868e96',
	gray700: '#495057',
	gray800: '#343a40',
	gray900: '#212529',
	graydark: '#343a40',
}

const toRGBA = (value, opacity=1) => {
	var c = void 0;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) {
		c = value.substring(1).split('');
		if (c.length===3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		c = '0x' + c.join('');
		return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ',' + opacity + ')';
	}
}

const HighchartsColors = [
	colors.success,
	colors.primary,
	colors.warning,
	colors.salmon,
	colors.secondary,
	colors.info,
	colors.java,
	colors.royalblue,
	colors.yellow,
	colors.reagentgray,
	colors.carnation,
	colors.riptide,
];

$(()=>{
	Highcharts.setOptions({
		colors: HighchartsColors,
		chart: {
			spacingTop: 15,
			spacingBottom: 5,
			spacingLeft: 5,
			height: 350,
			zoomType: 'xy',
			animation: false,
		},
		title: {
			text: '',
		},
		xAxis: {
			labels: {
				style: {
					color: colors.gray
				}
			},
		},
		yAxis: {
			labels: {
				style: {
					color: colors.gray
				}
			},
		},
		credits: {
			enabled: false,
		},
		tooltip: {
			shadow: false,
			animation: false,
		},
		legend: {
			margin: 4,
		},
		navigation: {
			buttonOptions: {
				y: -12
			}
		},
	});
});

const HC = {
	bar: {
		plotOptions: {
			series: {
				colorByPoint: true,
				groupPadding: 0
			}
		},
		legend: {
			enabled: false
		},
	},
	histogram: {
		chart: {
			type: 'column',
		},
		tooltip: {
			formatter: function() {
				return 'Frequency: '+this.y;
			}
		},
		plotOptions: {
			series: {
				pointPadding: 0,
				groupPadding: 0
			}
		},
		yAxis: {
			allowDecimals: false,
			title: {
				text: 'Frequency'
			},
			labels: {
				style: {
					color: colors.gray500
				}
			},
		},
	},
	histogramStacked: {
		plotOptions: {
			column: {
				stacking: "normal"
			}
		},
		tooltip: {
			formatter: function() {
				return `<b>${this.series.name}</b><br>Frequency: ${this.y}`;
			}
		},
	},
	areaSpline: {
		chart: {
			type: 'areaspline'
		},
		plotOptions: {
			areaspline: {
				fillOpacity: .175,
				marker: { enabled: false }
			}
		},
		tooltip: {
			formatter: function() {
				return `<b>${this.series.name}</b><br>Frequency: ${this.y}`;
			}
		},
	},
	scatter: {
		chart: {
			type: 'scatter',
			height: 380,
		},
		xAxis: {
			gridLineWidth: 1,
		},
		yAxis: {
			lineWidth: 1,
		},
	},
	scatterMini: {
		chart: {
			type: 'scatter',
			height: 150,
			width: 150,
		},
		title: {
			style: { fontSize: '11px' },
		},
		exporting: { enabled: false },
		xAxis: {
			labels: { enabled: false },
			tickLength: 0,
			lineWidth: 0,
		},
		yAxis: {
			gridLineWidth: 0,
			lineWidth: 0,
			title: { text: '' },
			labels: { enabled: false },
		},
		legend: { enabled: false },
		tooltip: { enabled: false },
		plotOptions: {
			series: {
				marker: {
					symbol: 'circle',
					radius: 1,
				},
				color: colors.secondary,
			},
		},
	},
	scatter3d: {
		chart: {
			type: 'scatter3d',
			margin: 70,
			height: 500,
			animation: false,
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 30,
				depth: 250,
				viewDistance: 5,
				fitToPlot: false,
				frame: {
					bottom: { size: 1, color: 'rgba(0,0,0,.02)' },
					back: { size: 1, color: 'rgba(0,0,0,.04)' },
					side: { size: 1, color: 'rgba(0,0,0,.06)' }
				},
			},
		},
		plotOptions: {
			scatter: {
				width: 10,
				height: 10,
				depth: 10,
			}
		},
		yAxis: { title: null },
		xAxis: { gridLineWidth: 1 },
		zAxis: { min: 0, max: 10, showFirstLabel: false },
		legend: { enabled: false },
	},
	qqplot: {
		chart: {
			type: 'scatter',
			height: 380,
		},
		xAxis: {
			title: { text: 'Observed Value' },
		},
		yAxis: {
			lineWidth: 1,
			gridLineWidth: 0,
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			formatter: function() {
				return 'Expected: <b>'+this.point.y+'</b><br>Observed: <b>'+this.point.x+'</b>';
			}
		},
		plotOptions: {
			series: {
				marker: {
					symbol: 'circle'
				}
			},
		},
	},
	boxplot: {
		chart: {
			type: 'boxplot',
		},
		xAxis: {
			categories: ['']
		},
		yAxis: {
			labels: {
				style: {
					color: colors.gray500
				}
			},
		},
		legend: {
			enabled: false,
		},
	},
	pie: {
		chart: {
			type: 'pie',
			height: 400,
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				center: ['50%', '50%'],
				dataLabels: {
					format: '<b>{point.name}</b>: <span class="fw-400">{point.percentage:.2f} %</span>',
					distance: 15,
					style: {
						color: colors.gray700,
						textOutline: false
					}
				}
			}
		},
		tooltip: {
			pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)'
		},
	},
	pieDouble: {
		chart: {
			height: 430,
		},
		plotOptions: {
			pie: {
				allowPointSelect: false,
				cursor: 'default',
				dataLabels: {
					format: '<span class="fw-400">{point.name}</span>',
				},
			}
		},
	},
	packedBubble: {
		chart: {
			type: 'packedbubble',
			height: 410,
		},
		plotOptions: {
			packedbubble: {
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					style: {
						color: 'black',
						textOutline: 'none',
						fontWeight: 'normal'
					}
				},
				minPointSize: 5
			}
		},
		tooltip: {
			pointFormat: '<b>{point.name}:</b> {point.y}'
		},
	},
	heatMap: {
		chart: {
			type: 'heatmap',
			marginBottom: 80,
			plotBorderWidth: 1,
		},
		colorAxis: {
			min: 0,
			minColor: '#FFFFFF',
			maxColor: Highcharts.getOptions().colors[0],
		},
		yAxis: {
			title: null
		},
		legend: {
			align: 'right',
			layout: 'vertical',
			margin: 0,
			verticalAlign: 'top',
		},
	},
	parallelCoordinates: {
		chart: {
			parallelCoordinates: true,
			parallelAxes: {
				lineWidth: 2
			},
			height: 400,
		},
		xAxis: {
			offset: 10
		},
		plotOptions: {
			series: {
				lineWidth: 1,
				animation: false,
				marker: {
					enabled: false,
					states: {
						hover: {
							enabled: false
						}
					}
				},
				states: {
					hover: {
						halo: {
							size: 0
						}
					}
				},
				events: {
					mouseOver: function () {
						this.group.toFront();
					}
				}
			}
		},
	},
}
