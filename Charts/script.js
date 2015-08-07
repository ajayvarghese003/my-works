function DrawChart(obj) {
    var chartValues, maxChartValue, element, two,
        elem = obj.elem, // dom element in which graph should be plotted
        width = obj.width, // width of graph
        height = obj.height; // height of graph 

    init();

    // variable initializing is done here
    function init() {
        chartValues = obj.data /*chartValueGenerator(0, 50, 50)*/ ; // generates graph data
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
    animate();
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

        var xPos1;
        console.log(xPos, "Out of Tween");

        // Below function is called repeatedly to draw the line to its height from 0
        var updateCallback = function() {
            var y2 = this.x;
            var line = two.makeLine(
                xPos,
                yPos,
                xPos,
                y2
            );
            console.log(y2, "Inside Tween");
            line.linewidth = lineStroke;
            line.cap = 'round';
            line.stroke = '#FF8000';
            two.update();
        }

        var tween = [];
        for (var i = 0; i < chartValues.length; i++) {
        // var i = 0;
        // var timer = setInterval(function() {
                // if (i < chartValues.length) {
                    console.log('In For loop', i)

                    var y2Pos = graphHeight - (chartValues[i] * yAxisDotsWidth);
                    /*var*/ tween[i] = new TWEEN.Tween({
                            x: yPos
                        })
                        .to({
                            x: y2Pos
                        }, 500)
                        .onUpdate(updateCallback)
                        .easing(TWEEN.Easing.Back.Out)
                        .onComplete(function() {
                            xPos = xPos + xAxisDotsWidth;
                        })/*.start()*/;
                    // i++;
                // } else {
                //     clearInterval(timer);
                // }
            // }, 500)
            }
            for(var i = 0; i < tween.length; i++){
             tween[i].start();
            }

    }

    // Here Graph is updated for every change in x value which varies according to time.
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
        console.log('In Animate function');
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

    //graph animation is done here
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
                'stroke-dashoffset 0.344s cubic-bezier(0.23, 0.6, 0.09, 0.96)';
            // Go!
            path.style.strokeDashoffset = '0';
        }


    }

    document.getElementById('resetBtn').onclick = function() {
        init();
        drawBarGraph();
    }
}
