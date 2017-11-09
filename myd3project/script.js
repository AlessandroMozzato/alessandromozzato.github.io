var bardata = [];

for (var i = 0; i < 100; i++) {
    bardata.push(Math.round(Math.random()*30))
}

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height])

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width])

var colors = d3.scale.linear()
        .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
        .range(['blue', 'green', '#FFB832','#C61C6F'])

var tempColor;

var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', '0')

var myChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', function(d,i)    {
            return colors(i);
        })
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('y', height)
    .on('mouseover', function(d)    {

        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY) + 'px')

        tempColor = this.style.fill
        d3.select(this)
            .style('opacity', .5)
            .style('fill','yellow')
    })
    .on('mouseout', function(d)    {
        d3.select(this)
            .style('opacity', 1.)
            .style('fill',tempColor)
    })

myChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d)  {
        return height - yScale(d);
    })
    .delay(function(d,i)    {
        return i * 20;
    })
    .duration(100)
    .ease('elastic')

