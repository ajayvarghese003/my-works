function DrawChart(obj) {
    var chartValues, maxChartValue, element, two,
        elem = obj.elem, // dom element in which graph should be plotted
        width = obj.width, // width of graph
        height = obj.height; // height of graph 

    init();

    // variable initializing is done here
    function init() {
        chartValues = /*obj.data */ chartValueGenerator(0, 50, 10); // generates graph data
        maxChartValue = Math.max.apply(null, chartValues);
        element = document.querySelector(elem);
        element.innerHTML = "";
        two = new Two({
            width: width,
            height: height
        }).appendTo(element);
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
    // placeLabels();

    // Graph plotting is done here
    function drawBarGraph() {
        var xAxisDots = chartValues.length,
            xAxisDotsWidth = width / xAxisDots,
            xPos = xAxisDotsWidth / 2,
            yAxisDotsWidth = height / maxChartValue,
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

            // var t = graphHeight;

            var y2Pos = graphHeight - (chartValues[i] * yAxisDotsWidth);
            // console.log(typeof chartValues[i], i)


            console.log('Inside For loop....');
            // two.bind('update', function(frameCount) {
            var currValue = 0;


            // if (t > y2Pos) {
            console.log('Inside Bind Function....', i, y2Pos);
            var line = two.makeLine(
                xPos,
                yPos,
                xPos,
                /*t*/
                y2Pos
            );
            console.log('Here is the line...', line)
            line.linewidth = lineStroke;
            line.cap = 'round';
            // 
            line.stroke = '#FF8000';
            // t = t - 10;
            // } else {
            // return false;
            // }


            // }).play();
            lineArray.push(line);
            xPos = xPos + xAxisDotsWidth;
        }
        lineGroup = two.makeGroup(lineArray);
        console.log(lineGroup);
        // lineGroup.opacity = 0.5; 
        // lineGroup.translation.y = 0;
        var translateX = 0;
        // two.bind('update', function(frameCount) {
        //     if (lineGroup.translation.y > 10) {
        //         lineGroup.translation.y = lineGroup.translation.y - 1;
        //     };
        //     // translateX += 1;
        // }).play();
        two.update();
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
        console.log(chartValues);
        return chartValues;
    }

    document.getElementById('resetBtn').onclick = function() {
        init();
        drawBarGraph();
    }
}
