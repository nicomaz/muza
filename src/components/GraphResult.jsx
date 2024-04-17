import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function GraphResult({ data }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphInitialized, setGraphInitialized] = useState(false);

  useEffect(() => {
    if (!data) return;

    // checks the width and height of the page, ensures graph fits the page
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    // updates the width & height states
    const handleResize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  useEffect(() => {
    if (!data || dimensions.width === 0 || dimensions.height === 0) return;

    // makes sure that instead of a new graph being made, the graph that already exists is just updated. checks if graph exists, if it does then it updates graph, otherwise it creates graph.
    if (!graphInitialized) {
      createGraph();
      setGraphInitialized(true);
    } else {
      updateGraph();
    }
  }, [data, dimensions, graphInitialized]);

  const createGraph = () => {
    const { width, height } = dimensions;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // copy of data
    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-2400))
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2)
      )
      .on("tick", ticked);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: 100%;");

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => color(d.group));

    const label = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(function (d) {
        return d.id;
      })
      .attr("class", "label")
      .attr("dy", -10)
      .attr("text-anchor", "middle");

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);

      label.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    svg.selectAll("g").on("click", function (d) {
      console.log(d.target["__data__"].id);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  };

  const updateGraph = () => {
    const { width, height } = dimensions;

    const svg = d3.select(svgRef.current);

    svg.attr("width", width).attr("height", height);
  };

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
}
