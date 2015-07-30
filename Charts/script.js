function DrawChart(obj) {
    var chartValues, maxChartValue, element, two,
        elem = obj.elem, // dom element in which graph should be plotted
        width = obj.width, // width of graph
        height = obj.height; // height of graph 

    init();

    // variable initializing is done here
    function init() {
        chartValues = /*obj.data */ chartValueGenerator(0, 50, 50); // generates graph data
        maxChartValue = Math.max.apply(null, chartValues);
        element = document.querySelector(elem);
        element.innerHTML = "";
        two = new Two({

            width: width,
            height: height
        }).appendTo(element);
        // document.getElementById('chartValues').textContent = chartValues;
    }

    // validation are done here
    if (!element) {
        console.error('Element : ' + elem + ', Not Found');
        return false;
    }

    if (chartValues.length == 0) {
        console.error('Insufficient Data to plot Chart');
        return false;
    }

    drawBarGraph();
    // animateGraph();
    // placeLabels();

    // Graph plotting is done here
    function drawBarGraph() {
        var xAxisDots = chartValues.length,
            xAxisDotsWidth = width / xAxisDots,
            xPos = xAxisDotsWidth / 2,
            yAxisDotsWidth = height / (maxChartValue + 2),
            yPos = height - xAxisDotsWidth / 2,
            graphHeight = height - xAxisDotsWidth / 3,
            lineStroke = (xAxisDotsWidth / 3) * 2;

        console.log(xAxisDots,
            xAxisDotsWidth,
            xPos,
            yAxisDotsWidth,
            yPos,
            graphHeight,
            lineStroke);

        var lineGroup, lineArray = [];
        for (var i = 0; i < chartValues.length; i++) {

            var line, t = graphHeight;

            var y2Pos = graphHeight - (chartValues[i] * yAxisDotsWidth);
            // console.log(typeof chartValues[i], i)

            console.log('Inside For loop....');
            // two.bind('update', function(frameCount) {
            var currValue = 0;
            if (t > y2Pos) {
                line = two.makeLine(
                    xPos,
                    yPos,
                    xPos,
                    /*t*/
                    y2Pos
                );
                line.linewidth = lineStroke;
                line.cap = 'round';
                line.stroke = '#FF8000';
                t = t - 10;
            }
            // }).play();
            lineArray.push(line);
            xPos = xPos + xAxisDotsWidth;
        }
        lineGroup = two.makeGroup(lineArray);
        // console.log(lineGroup);
        // lineGroup.opacity = 0.5; 

        // animation is done here -- tranlating whole svg graph

        // lineGroup.translation.y = height;
        // two.bind('update', function(frameCount) {
        //     if (lineGroup.translation.y > 0) {
        //         lineGroup.translation.y = lineGroup.translation.y - 10;
        //     } else {
        //         console.log(lineGroup.translation.y);
        //     }
        // }).play();



        two.update();
        animateGraph();
    }

    function placeLabels() {
        var group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        document.querySelector('#chart-cont > svg > g').appendChild(group);
        group.setAttributeNS(null, 'text-anchor', 'end');
        group.appendChild(text);
        group.setAttributeNS(null, 'x', '0');
        group.setAttributeNS(null, 'y', '0');
        group.setAttributeNS(null, 'fill', '#333');
        text.appendChild(document.createTextNode('50'));
        text.setAttributeNS(null, 'x', '0');
        text.setAttributeNS(null, 'y', '0');
    }

    // Graph Data are generated here
    function chartValueGenerator(min, max, count) {
        chartValues = [];
        for (var i = 0; i < count; i++) {
            var value = Math.ceil((Math.random() * max) + min);
            chartValues[i] = value;
        }
        console.log('Chart Data :', chartValues);
        return chartValues;
    }

    function animateGraph() {
        var pathArray = document.querySelectorAll(elem + " " + 'svg path')
        for (var i = 0; i < pathArray.length; i++) {
            var path = pathArray[i];
            var length = path.getTotalLength();
            // Clear any previous transition
            path.style.transition = path.style.WebkitTransition =
                'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            // Define our transition
            path.style.transition = path.style.WebkitTransition =
                'stroke-dashoffset 0.344s ease-in-out';
            // Go!
            path.style.strokeDashoffset = '0';
        }


    }

    document.getElementById('resetBtn').onclick = function() {
        init();
        drawBarGraph();
        // animateGraph();
    }
}
