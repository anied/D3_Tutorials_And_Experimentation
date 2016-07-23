document.addEventListener('DOMContentLoaded', function () {
    
    var height;
    var width;
    var svg = d3.select('#fibonacci-circles');
    var dataset = [];
    var rMultiplier = 2;
    var spacer = 5;
    var display; // necessary?

    function calculateSVGDimensions() {
        //TODO-- there may be a better way to handle this...
        var topSection = document.querySelector('#introAndControlsWrapper');
        var svgWrapper = document.querySelector('#fibonacciCirclesWrapper');

        height = window.innerHeight - topSection.offsetHeight;
        width = svgWrapper.getBoundingClientRect().width;

        svg.attr('height', height);
        svg.attr('width', width);
    }

    function incrementDataset() {

        var length = dataset.length;

        if ( length === 0 ) {
            dataset.push(1);
        } else if ( length === 1 ) {
            dataset.push(1);
        } else {
            dataset.push(dataset[length-1]+dataset[length-2]);
        }
        update(dataset);
    }

    function registerEventListeners() {
        document.querySelector('#incrementButton').addEventListener('click', incrementDataset);
    }

    function update(newData) {
        display = svg.selectAll('circle')
                         .data(newData);

        display.enter()
               .append('circle')
               .style('fill', 'steelblue')
               .attr('cy', function (d) { return (height/2); })
               .attr('cx', function (d, i) {
                    var radiiBuffers = rMultiplier*d;
                    var j;

                    i = i-1;

                    if (i > 0) {
                        for (j = i; j > 0; j--) {
                            radiiBuffers += rMultiplier*dataset[j-1]*2;                        
                        }
                    }

                    return (spacer*i)+radiiBuffers;
               })
               .attr('r', rMultiplier)
               .transition()
               .duration(500)
               .delay(0)
               .attr('cx', function (d, i) {
                    var radiiBuffers = rMultiplier*d;
                    var j;

                    if (i > 0) {
                        for (j = i; j > 0; j--) {
                            radiiBuffers += rMultiplier*dataset[j-1]*2;                        
                        }
                    }

                    return (spacer*i)+radiiBuffers;
                })
               .transition()
               .attr('r', function (d) { return rMultiplier*d; })
               .delay(1000)
               .duration(500)
               .ease('bounce');
    }

    registerEventListeners();
    calculateSVGDimensions();

});