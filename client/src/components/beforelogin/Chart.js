import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson"
import "../css/WorldMap.css";
const Chart = props => {
   const width = 900;
   const height = 800;

   const chardiv = useRef(null);

   const drawMap = () => {
      if (chardiv.current) {
         const svg = d3.select(chardiv.current)
            .attr("width", width)
            .attr("height", height);

         //Set the Projuction
         const projection = d3.geoEquirectangular();
         const pathGenerator = d3.geoPath()
            .projection(projection);

         //Set th epath of the globe
         svg.append("path")
            .attr("class", "sphere")
            .attr("d", pathGenerator({ type: "Sphere" }));

         d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
            .then(data => {
               const countries = feature(data, data.objects.countries);

               //Set Path per country
               svg.selectAll("path")
                  .data(countries.features)
                  .enter().append("path")
                  .attr("class", "country")
                  .attr("cursor", "pointer")
                  .attr("d", d => pathGenerator(d))
                  .append("title")
                  .text(d => { return (d.properties.name) })
            })

      }
   };

   drawMap();
   useEffect(() => {
      drawMap();
   });
   return (
      <section className="WorldMap">
         <svg ref={chardiv}></svg>
      </section>
   );
};

export default Chart;
