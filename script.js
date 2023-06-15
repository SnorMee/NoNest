//################################
let canvas = d3.select('#canvas')


 
let drawTreeMap = (data) => {
    canvas.selectAll('*').remove();
    let hierarchy = d3.hierarchy(data, (node)=>{
        return node['children'];
    }).sum((node) =>{
        return node['value'];
    }).sort((node1,node2) =>{
        return node2['value'] - node1['value'];
    })

    let createTreeMap = d3.treemap()
                            .size([1000, 600])

    createTreeMap(hierarchy)
    let nodes = hierarchy.descendants();
  let leaves = hierarchy.leaves();

    
    let threatLeaves = hierarchy
    //console.log(threatLeaves)

    let block = canvas.selectAll('g')
            .data(threatLeaves)
            .enter()
            .append('g')
            .attr('transform', (tree) => {
                return 'translate(' + tree['x0'] + ', ' + tree['y0'] + ')'
            })
            .on('click', zoom);
    block.append('rect')
            //Color 7
            .attr('fill', (tree) => {
                let category = tree['data']['name'].split('.')[0]
                if(category === '1'){
                    return '#f03e3e'
                }else if(category === '2'){
                    return '#d6336c'
                }else if(category === '3'){
                    return '#ae3ec9'
                }else if(category === '4'){
                    return '#7048e8'
                }else if(category === '5'){
                    return '#4263eb'
                }else if(category === '6'){
                    return '#1c7ed6'
                }else if(category === '7'){
                    return '#1098ad'
                }else if(category === '8'){
                    return '#0ca678'
                }else if(category === '9'){
                    return '#37b24d'
                }else if(category === '10'){
                    return '#74b816'
                }else if(category === '11'){
                    return '#f59f00'
                }else if(category === '12'){
                    return '#f76707'
                }
            }).attr('data-name', (tree) => {
                return tree['data']['name']
            }).attr('data-category',(tree) => {
                return tree['data']['name'].split('.')[0]
            }).attr('data-spLen', (tree) => {
                return tree['data']['num']
            }).attr('width', (tree) => {
                return tree['x1'] - tree['x0']
            }).attr('height', (tree) => {
                return tree['y1'] - tree['y0']
            })
            .on('mouseover', function (event, d) {
                tooltip.style('opacity', 1);
                tooltip.html("<strong>" + d.data.category + "</strong><br>" +
                "Number of species affected: " + d.data.value + "<br>" +
                "Number of threats: " + d.data.numT + "<br>" +
                "Species affected:" + d.data.species) //Add more information here
                  .style('left', (event.pageX + 10) + 'px')
                  .style('top', (event.pageY + 10) + 'px');
              })
              .on('mouseout', function () {
                tooltip.style('opacity', 0);
              })
              .on('click', zoom);

    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip');

    block.append('text')
            .text((tree) => {
                return tree['data']['name'];
            })
            .attr('x', 5)
            .attr('y', 20)
    block.append('text')
        .text((tree) => {
            return  tree['data']['category']
        })
        .attr('x', 5)
        .attr('y', 40)
    ;
};

////////////////////////////////////////////////////////////////////// LOAD DATA //////////////////////////////////////////////////////////

let dataTest = {
    "name": "All",
    "children": [
        {
            "name": "2",
            "children": [
                {
                    "name": "2.3.2",
                    "value": 1
                },
                {
                    "name": "2.3.4",
                    "value": 1
                },
                {
                    "name": "2.3.1",
                    "value": 1
                }
            ]
        },
        {
            "name": "3",
            "children": [
                {
                    "name": "3.2",
                    "value": 1
                }
            ]
        },
        {
            "name": "5",
            "children": [
                {
                    "name": "5.3.1",
                    "value": 3
                },
                {
                    "name": "5.3.2",
                    "value": 1
                },
                {
                    "name": "5.3.3",
                    "value": 1
                },
                {
                    "name": "5.3.4",
                    "value": 1
                },
                {
                    "name": "5.3.5",
                    "value": 2
                },
                {
                    "name": "5.2.1",
                    "value": 1
                }
            ]
        },
        {
            "name": "6",
            "children": [
                {
                    "name": "6.1",
                    "value": 1
                }
            ]
        },
        {
            "name": "7",
            "children": [
                {
                    "name": "7.1.3",
                    "value": 2
                },
                {
                    "name": "7.1.1",
                    "value": 1
                },
                {
                    "name": "7.3",
                    "value": 1
                }
            ]
        },
        {
            "name": "8",
            "children": [
                {
                    "name": "8.1.1",
                    "value": 2
                },
                {
                    "name": "8.2.2",
                    "value": 1
                },
                {
                    "name": "8.2.1",
                    "value": 1
                },
                {
                    "name": "8.2",
                    "value": 1
                }
            ]
        },
        {
            "name": "10",
            "children": [
                {
                    "name": "10.3",
                    "value": 2
                }
            ]
        },
        {
            "name": "11",
            "children": [
                {
                    "name": "11.1",
                    "value": 3
                },
                {
                    "name": "11.2",
                    "value": 1
                }
            ]
        },
        {
            "name": "12",
            "children": [
                {
                    "name": "12.1",
                    "value": 1
                }
            ]
        }
    ]
}

//console.log(dataTest);
//drawTreeMap(dataTest);

function zoom(d) {
    if (d.depth === 0) {
      // If clicked on the root node, zoom out to the initial view
      drawTreeMap(dataTest);
    } else {
      // If clicked on a child node, zoom in to show its children
      drawTreeMap(d.data);
    }
  }
  


const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');

  let searchText = '';

  searchBar.addEventListener('input', (event) => {
    searchText = event.target.value;
  });

  searchButton.addEventListener('click', () => {
    search(searchText);
  });

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      search(searchText);
    }
  });

  function search(text) {
    console.log(`Searching for "${text}"...`);
    // Add your search functionality here.
    let selectedWord = text; //Add Search Word
    console.log(dataTest);
    drawTreeMap(dataTest);
  };

