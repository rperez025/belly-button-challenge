// We want to make this more function based, therefore:

// A function that populates the meta data
function demoInfo(sample)
{
    //console.log(sample);

    // use d3.json to get the data
    d3.json('samples.json').then((data) => {
        // grab all of the metadata
        let metaData = data.metadata;
        //console.log(metadata);

        // filter based on the value of the sample (should return 1 result in an array
        // based on the dataset)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        // access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // clear the metadata out
        d3.select('#sample-metadata').html(''); // clears the HTML

        // use Object.entries to get the key-value pairs
        Object.entries(resultData).forEach(([key, value]) => {
            // add to the sample data / demographics section
            d3.select('#sample-metadata')
                .append('h5').text(`${key}: ${value}`);
        });
    });    
}

// A function that builds the bar chart
function buildBarChart(sample)
{
    //console.log(sample);
    //let data = d3.json('samples.json');
    //console.log(data);
    
    d3.json('samples.json').then((data) => {
        // grab all of the samples (sample data)
        let sampleData = data.samples;
        //console.log(sampleData);

    
        // filter based on the value of the sample (should return 1 result in an array
        // based on the dataset)
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        
        // access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // get the otu_ids, otu_labels, and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);


        // build the bar chart
        // get the yticks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        //console.log(textLabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: 'bar',
            orientation: 'h'
        }

        let layout = {
            title: 'Top 10 Belly Button Bacteria'
        };

        Plotly.newPlot('bar', [barChart], layout);
    });
}

// function that builds the bubble chart
function buildBubbleChart(sample)
{
    //console.log(sample);
    //let data = d3.json('samples.json');
    //console.log(data);
    
    d3.json('samples.json').then((data) => {
        // grab all of the samples (sample data)
        let sampleData = data.samples;
        //console.log(sampleData);

    
        // filter based on the value of the sample (should return 1 result in an array
        // based on the dataset)
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        
        // access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // get the otu_ids, otu_labels, and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);


        // build the bubble chart
        
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size:  sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }

        let layout = {
            title: 'Bacteria Cultures Per Sample',
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'}
        };

        Plotly.newPlot('bubble', [bubbleChart], layout);
    });
}

// We create a function that initializes the dashboard
function initialize()
{
    //let data = d3.json('samples.json');
    //console.log(data); 
    
    // access the dropdown selector form the index.html file
    var select = d3.select('#selDataset');

    // use d3.json to get the names data
    d3.json('samples.json').then((data) => {
        let sampleNames = data.names; // made an array of just the sample names
        //console.log(sampleNames);

        // use a forEach to add and create options for each one of the samples
        // selector
        sampleNames.forEach((sample) => {
            select.append('option')
                .text(sample)
                .property('value', sample);
        });

         // when we initialized, we pass in the information for the first sample
         let sample1 = sampleNames[0];

        // call the function to build the metadata
        demoInfo(sample1);
        // call function to build the bar chart
        buildBarChart(sample1);
        // call function to build the bubble chart
        buildBubbleChart(sample1);
    });
}

// Create a function that updates the dashboard
function optionChanged(item)
{
    // call the update to the metadata
    demoInfo(item);
    // call function to build the bar chart
    buildBarChart(item);
    // call function to build the bubble chart
    buildBubbleChart(item);
}

// call the initialize function
initialize();
