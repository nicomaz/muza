import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getArtistInfo, getArtistVideos } from "../utils/api";
import SnippetCard from "./SnippetCard";

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
      .force("charge", d3.forceManyBody().strength(-5000))
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2)
      )
      .on("tick", ticked);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [0, 0, width, height])
      .attr("cursor", "grab");

    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.5)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = g
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", 6)
      .attr("fill", (d) => color(d.group))
      .attr("cursor", "pointer");

    const label = g
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

    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([0.1, 10])
      .on("zoom", zoomed);

    svg.call(zoom).on("wheel", (event) => event.preventDefault());

    function zoomed(event) {
      g.attr("transform", event.transform);
    }

    g.call(zoom.transform, d3.zoomIdentity);

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
      const artistName = d.target["__data__"].id;
      // getArtistVideos(artistName).then((videoDetails) => {
      //   setVideoInfo(videoDetails);
      // });
      // getArtistInfo(artistName).then((artistInfo) => {
      //   setArtistInfo(artistInfo);
      // });
    });

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
    <>
      <div className="flex__container">
        <div className="navbar">nav</div>
        <div className="main__window">
          <div className="left__container"></div>
          <div className="data__col">
            <div className="graph">
              <div className="svg-container" ref={containerRef}>
                <div className="main-graph">
                  <svg ref={svgRef}></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right__container"></div>
        </div>
      </div>
    </>
  );
}
