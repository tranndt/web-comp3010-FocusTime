var diameter = 1000,
  format = d3.format(",d");

var color = d3.scale.ordinal()
  .range(["#E91E63", "#3F51B5", "#00BCD4", "#607D8B", "#009688"]);

var bubble = d3.layout.pack()
  .sort(null)
  .size([diameter, diameter])
  .padding(6);

//append is toevoegen
var svg = d3.select("body").append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

// Jsonbestandje van een andere codepen
d3.json("https://codepen.io/Quendoline/pen/qOaopr.js", function(error, root) {
  if (error) throw error;

  var node = svg.selectAll(".circle")
    .data(bubble.nodes(classes(root))
      .filter(function(d) {
        return !d.children;
      }))

  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .on("mouseover", function(d) {

      d3.select("#tooltip")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("opacity", 1)
        .select("#text")
        .text(d.className);

    });

  node.append("circle")
    .attr("r", function(d) {
      return 1 * d.r;
    })
    .style("fill", function(d) {
      return color(d.packageName);
    });

  node.append("text")
    .attr("dy", ".5em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.value

    });

  $(document).ready(function() {
    $(".node circle").hover(

      function() {
        $(this).css({
          "opacity": .4,
          "transition": "1s"
        });
        $(".node text").css({
          "margin": "100px"

        });
      },

      function() {
        $(this).css({
          "opacity": 1,

        });
        $(this).css({
          "opacity": 1
        });
      }

    );
    startTimeline();

  });
});

function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) {
      recurse(node.name, child, node.size);
    });
    else classes.push({
      packageName: name,
      className: node.name,
      value: node.size
    });
  }

  recurse(null, root);
  return {
    children: classes
  };
}

d3.select(self.frameElement).style("height", diameter + "px");

//greensock
function startTimeline() {
  var tl = new TimelineMax();
  var circle = $('.node circle').get();
  var text = $('.node text');

  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  shuffle(circle);

  tl.set(circle, {
    left: 100,
    opacity: 0,
    scale: 0
  })

  tl.set(text, {
    left: 100,
    opacity: 0
  })

  tl.staggerTo(circle, 0.8, {
    opacity: 1,
    transformOrigin: "center center",
    scale: 1,
    ease: Elastic.easeOut.config(1),
  }, 0.04)

  tl.to(text, 0.5, {
    opacity: 1,
  })

}