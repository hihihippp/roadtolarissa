//helper functions
var f = function(str){ return function(obj){ return str ? obj[str] : obj; }}
var compose = function(g, h){ return function(d, i){ return g(h(d, i)); }}

var numBars = 10;
var data = d3.range(-numBars*2, numBars*2, 2);

var width = 200,
    height = 200;


var x = d3.scale.ordinal()
    .domain(d3.range(numBars*2))
    .rangeRoundBands([0, width], .1)

var y = d3.scale.linear()
    .domain(d3.extent(data))
    .range([height, 0])

var svg = d3.select('body').append('svg')
    .attr({width: width, height: height})

svg.selectAll('rect')
    .data(data).enter()
  .append('rect')
    .attr('x', function(d, i){ return x(i); })
    .attr('width', x.rangeBand())
    .attr('y', function(d){ return y(d > 0 ? d : 0); })
    .attr('height', function(d){ return y(0) - y(Math.abs(d)); })


d3.select('body').append('h1')
    .text('Naive Transition')
    .on('click', function(){
      svg.selectAll('rect')
          .data(d3.shuffle(data))
        .transition().duration(1000)
          .attr('y', function(d){ return y(d > 0 ? d : 0); })
          .attr('height', function(d){ return y(0) - y(Math.abs(d)); })
    })

d3.select('body').append('h1')
    .text('Tween Transition')
    .on('click', function(){
      svg.selectAll('rect')
          .data(d3.shuffle(data))
        .transition().duration(1000)
          .attrTween('y', function(d){
            var current = d3.select(this)
          })
          .attr('y', function(d){ return y(d > 0 ? d : 0); })
          .attr('height', function(d){ return y(0) - y(Math.abs(d)); })
    })

function currentBarData(bar){
  var height = bar.attr('height');
  var yPos = bar.attr('y');
  return (yPos < 0 ? -1 : 1)*(y.invert(height) - y(0));
}

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}


d3.selectAll('h1')
    .style('cursor', 'pointer')