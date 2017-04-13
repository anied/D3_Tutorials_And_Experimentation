document.addEventListener('DOMContentLoaded', function () {

    function sectionOne() {
        var data = [1, 2, 3, 5, 7, 11, 13];
        var paragraphs = d3.select('#sectionOne')
                            .selectAll('p')
                            .data(data);

        paragraphs.enter()
                .append('p')
                .text(function (d, i) {
                    return 'Prime T'+i+':  '+d;
                });
        
    }

    function sectionTwo() {
        var data = [1, 1, 2, 3, 5, 8, 13];

        function updateData(newData) {
            var data = newData || [];
            var i;
            var numDataPoints;
            var paragraphs;

            function updateReadout(newData) {
                var readoutMsg = '['+newData.toString().replace(/,/g, ', ')+']';
                document.querySelector('#lessonTwo .current-data').value = readoutMsg;
            }

            if (data.length < 1) {

                numDataPoints = Math.ceil(Math.random()*10); //Data can contain between 1 and 10 values

                for (i = 0; i < numDataPoints; i++) {
                    data.push(Math.round(Math.random()*100)); //Data is any integer between 0 and 100
                }

            }

            paragraphs = d3.select('#sectionTwo')
                           .selectAll('p')
                           .data(data);

            paragraphs.enter()
                      .append('p')
                      .text(function (d, i) { return 'Paragraph #'+i+' -- Data: '+d; });

            paragraphs.exit().remove();

            paragraphs.text(function (d, i) { return 'Paragraph #'+i+' -- Data: '+d; });

            updateReadout(data);
            
        }


        updateData(data);

        document.querySelector('#lessonTwo .request-fresh-data').addEventListener('click', function () {
            updateData();
        });

    }



    sectionOne();
    sectionTwo();

});