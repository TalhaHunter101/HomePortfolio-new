'use client';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ECPBarChart = ({ data, setCurrentColour }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ratingInfo, setRatingInfo] = useState("")
  const [potenInfo, setPotenInfo] = useState("")
  

  const ratingColors = {
    A: { class: "band-a", color: "#00C781" },
    B: { class: "band-b", color: "#19b459" },
    C: { class: "band-c", color: "#fffff" },
    D: { class: "band-d", color: "#ffd500" },
    E: { class: "band-e", color: "#fcaa65" },
    F: { class: "band-f", color: "#ef8023" },
    G: { class: "band-g", color: "#e9153b" },
  };
  

  useEffect(() => {
    if (data) {
      setIsLoading(false);

      const currentRating = data?.CURRENT_ENERGY_RATING;
      const ratingInfo = ratingColors[currentRating] || { class: "", color: "" };
      console.log("ratingInfo", ratingInfo);
      
      setRatingInfo(ratingInfo)
      setCurrentColour(ratingInfo)


      const potential = data?.POTENTIAL_ENERGY_RATING;
      const potentialInfo = ratingColors[potential] || { class: "", color: "" };
      setPotenInfo(potentialInfo)

      
    }
  }, [data]);

  function calculateY(energyRating) {
    switch (energyRating) {
      case "G":
        return 320;
      case "F":
        return 270; // 320 - 50
      case "E":
        return 220;
      case "D":
        return 170;
      case "C":
        return 120;
      case "B":
        return 70;
      case "A":
        return 20;

      default:
        return 220; 
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>

        <div className="block md:hidden">
            <svg
              width="345"
              height="276"
              viewBox="0 0 615 376"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="svg-title svg-desc"
              role="img"
              class="epc-energy-rating-graph"
            >
              <title id="svg-title">Energy efficiency chart</title>
              <desc id="svg-desc">
                This property’s current energy rating is{" "}
                {data?.CURRENT_ENERGY_RATING} with a score of{" "}
                {data?.CURRENT_ENERGY_EFFICIENCY}. It has a potential energy


    
                rating of {data?.POTENTIAL_ENERGY_RATING} with a score of{" "}
                {data?.POTENTIAL_ENERGY_EFFICIENCY}.
              </desc>
              

              <line
                x1="72"
                y1="0"
                x2="72"
                y2="376"
                className="inner-border"
              ></line>
              <line
                x1="410"
                y1="0"
                x2="410"
                y2="376"
                class="inner-border"
              ></line>
              <line
                x1="510"
                y1="0"
                x2="510"
                y2="376"
                class="inner-border"
              ></line>
              <line x1="0" y1="25" x2="615" y2="25" class="inner-border"></line>
              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>

              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>
              <line x1="0" y1="0" x2="0" y2="376" class="inner-border"></line>
              <line
                x1="615"
                y1="376"
                x2="615"
                y2="0"
                class="inner-border"
              ></line>
              <line
                x1="615"
                y1="376"
                x2="0"
                y2="376"
                class="inner-border"
              ></line>

              <rect width="78" height="50" x="72" y="25" class="band-a"></rect>
              <rect width="118" height="50" x="72" y="75" class="band-b"></rect>
              <rect
                width="158"
                height="50"
                x="72"
                y="125"
                class="band-c"
              ></rect>
              <rect
                width="198"
                height="50"
                x="72"
                y="175"
                class="band-d"
              ></rect>
              <rect
                width="238"
                height="50"
                x="72"
                y="225"
                className="fill-[#fcaa65]"
              ></rect>
              <rect
                width="278"
                height="50"
                x="72"
                y="275"
                class="band-f"
              ></rect>
              <rect
                width="318"
                height="50"
                x="72"
                y="325"
                class="band-g"
              ></rect>

              <rect
                width="72"
                height="50"
                x="0"
                y="25"
                class="band-a-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="75"
                class="band-b-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="125"
                class="band-c-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="175"
                class="band-d-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="225"
                class="band-e-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="275"
                class="band-f-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="325"
                class="band-g-score"
              ></rect>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="letter"
              >
                <tspan x="107" y="64">
                  A
                </tspan>
                <tspan x="147" y="114">
                  B
                </tspan>
                <tspan x="187" y="164">
                  C
                </tspan>
                <tspan x="227" y="214">
                  D
                </tspan>
                <tspan x="267" y="264">
                  E
                </tspan>
                <tspan x="307" y="314">
                  F
                </tspan>
                <tspan x="347" y="364">
                  G
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="small"
              >
                <tspan x="8" y="55">
                  92+
                </tspan>
                <tspan x="8" y="105">
                  81-91
                </tspan>
                <tspan x="8" y="155">
                  69-80
                </tspan>
                <tspan x="8" y="205">
                  55-68
                </tspan>
                <tspan x="8" y="255">
                  39-54
                </tspan>
                <tspan x="8" y="305">
                  21-38
                </tspan>
                <tspan x="8" y="355">
                  1-20
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="8"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Score
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="85"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Energy rating
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="460"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Current
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="565"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Potential
              </text>

              <svg
                aria-hidden="true"
                x="415"
                y={calculateY(data?.CURRENT_ENERGY_RATING)}
                width="90"
                height="50"
                className="rating-current rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  className={`rating-current rating-label ${ratingInfo.class}`}
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.CURRENT_ENERGY_EFFICIENCY}{" "}
                  {data?.CURRENT_ENERGY_RATING}
                </text>
              </svg>

              <svg
                aria-hidden="true"
                x="515"
                y={calculateY(data?.POTENTIAL_ENERGY_RATING)}
                width="90"
                height="50"
                className={`rating-current rating-label ${potenInfo.class}`}
                class="rating-potential rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  class={`${potenInfo.class}`}
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.POTENTIAL_ENERGY_EFFICIENCY}{" "}
                  {data?.POTENTIAL_ENERGY_RATING}
                </text>
              </svg>
            </svg>
          </div>

          <div className="hidden lg:block">
            <svg
              width="345"
              height="276"
              viewBox="0 0 615 376"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="svg-title svg-desc"
              role="img"
              class="epc-energy-rating-graph"
            >
              <title id="svg-title">Energy efficiency chart</title>
              <desc id="svg-desc">
                This property’s current energy rating is{" "}
                {data?.CURRENT_ENERGY_RATING} with a score of{" "}
                {data?.CURRENT_ENERGY_EFFICIENCY}. It has a potential energy


    
                rating of {data?.POTENTIAL_ENERGY_RATING} with a score of{" "}
                {data?.POTENTIAL_ENERGY_EFFICIENCY}.
              </desc>
              

              <line
                x1="72"
                y1="0"
                x2="72"
                y2="376"
                className="inner-border"
              ></line>
              <line
                x1="410"
                y1="0"
                x2="410"
                y2="376"
                class="inner-border"
              ></line>
              <line
                x1="510"
                y1="0"
                x2="510"
                y2="376"
                class="inner-border"
              ></line>
              <line x1="0" y1="25" x2="615" y2="25" class="inner-border"></line>
              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>

              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>
              <line x1="0" y1="0" x2="0" y2="376" class="inner-border"></line>
              <line
                x1="615"
                y1="376"
                x2="615"
                y2="0"
                class="inner-border"
              ></line>
              <line
                x1="615"
                y1="376"
                x2="0"
                y2="376"
                class="inner-border"
              ></line>

              <rect width="78" height="50" x="72" y="25" class="band-a"></rect>
              <rect width="118" height="50" x="72" y="75" class="band-b"></rect>
              <rect
                width="158"
                height="50"
                x="72"
                y="125"
                class="band-c"
              ></rect>
              <rect
                width="198"
                height="50"
                x="72"
                y="175"
                class="band-d"
              ></rect>
              <rect
                width="238"
                height="50"
                x="72"
                y="225"
                className="fill-[#fcaa65]"
              ></rect>
              <rect
                width="278"
                height="50"
                x="72"
                y="275"
                class="band-f"
              ></rect>
              <rect
                width="318"
                height="50"
                x="72"
                y="325"
                class="band-g"
              ></rect>

              <rect
                width="72"
                height="50"
                x="0"
                y="25"
                class="band-a-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="75"
                class="band-b-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="125"
                class="band-c-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="175"
                class="band-d-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="225"
                class="band-e-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="275"
                class="band-f-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="325"
                class="band-g-score"
              ></rect>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="letter"
              >
                <tspan x="107" y="64">
                  A
                </tspan>
                <tspan x="147" y="114">
                  B
                </tspan>
                <tspan x="187" y="164">
                  C
                </tspan>
                <tspan x="227" y="214">
                  D
                </tspan>
                <tspan x="267" y="264">
                  E
                </tspan>
                <tspan x="307" y="314">
                  F
                </tspan>
                <tspan x="347" y="364">
                  G
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="small"
              >
                <tspan x="8" y="55">
                  92+
                </tspan>
                <tspan x="8" y="105">
                  81-91
                </tspan>
                <tspan x="8" y="155">
                  69-80
                </tspan>
                <tspan x="8" y="205">
                  55-68
                </tspan>
                <tspan x="8" y="255">
                  39-54
                </tspan>
                <tspan x="8" y="305">
                  21-38
                </tspan>
                <tspan x="8" y="355">
                  1-20
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="8"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Score
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="85"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Energy rating
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="460"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Current
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="565"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Potential
              </text>

              <svg
                aria-hidden="true"
                x="415"
                y={calculateY(data?.CURRENT_ENERGY_RATING)}
                width="90"
                height="50"
                className="rating-current rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  className={`rating-current rating-label ${ratingInfo.class}`}
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.CURRENT_ENERGY_EFFICIENCY}{" "}
                  {data?.CURRENT_ENERGY_RATING}
                </text>
              </svg>

              <svg
                aria-hidden="true"
                x="515"
                y={calculateY(data?.POTENTIAL_ENERGY_RATING)}
                width="90"
                height="50"
                className={`rating-current rating-label ${potenInfo.class}`}
                class="rating-potential rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  class={`${potenInfo.class}`}
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.POTENTIAL_ENERGY_EFFICIENCY}{" "}
                  {data?.POTENTIAL_ENERGY_RATING}
                </text>
              </svg>
            </svg>
          </div>

          <div className="hidden md:block lg:hidden">
            <svg
              width="615"
              height="376"
              viewBox="0 0 615 376"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="svg-title svg-desc"
              role="img"
              class="epc-energy-rating-graph"
            >
              <title id="svg-title">Energy efficiency chart</title>
              <desc id="svg-desc">
                This property’s current energy rating is B with a score of 83.
                It has a potential energy rating of A with a score of 94.
              </desc>

              <line
                x1="72"
                y1="0"
                x2="72"
                y2="376"
                className="inner-border"
              ></line>
              <line
                x1="410"
                y1="0"
                x2="410"
                y2="376"
                class="inner-border"
              ></line>
              <line
                x1="510"
                y1="0"
                x2="510"
                y2="376"
                class="inner-border"
              ></line>
              <line x1="0" y1="25" x2="615" y2="25" class="inner-border"></line>
              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>

              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>
              <line x1="0" y1="0" x2="0" y2="376" class="inner-border"></line>
              <line
                x1="615"
                y1="376"
                x2="615"
                y2="0"
                class="inner-border"
              ></line>
              <line
                x1="615"
                y1="376"
                x2="0"
                y2="376"
                class="inner-border"
              ></line>

              <rect width="78" height="50" x="72" y="25" class="band-a"></rect>
              <rect width="118" height="50" x="72" y="75" class="band-b"></rect>
              <rect
                width="158"
                height="50"
                x="72"
                y="125"
                class="band-c"
              ></rect>
              <rect
                width="198"
                height="50"
                x="72"
                y="175"
                class="band-d"
              ></rect>
              <rect
                width="238"
                height="50"
                x="72"
                y="225"
                class="band-e"
              ></rect>
              <rect
                width="278"
                height="50"
                x="72"
                y="275"
                class="band-f"
              ></rect>
              <rect
                width="318"
                height="50"
                x="72"
                y="325"
                class="band-g"
              ></rect>

              <rect
                width="72"
                height="50"
                x="0"
                y="25"
                class="band-a-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="75"
                class="band-b-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="125"
                class="band-c-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="175"
                class="band-d-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="225"
                class="band-e-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="275"
                class="band-f-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="325"
                class="band-g-score"
              ></rect>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="letter"
              >
                <tspan x="107" y="64">
                  A
                </tspan>
                <tspan x="147" y="114">
                  B
                </tspan>
                <tspan x="187" y="164">
                  C
                </tspan>
                <tspan x="227" y="214">
                  D
                </tspan>
                <tspan x="267" y="264">
                  E
                </tspan>
                <tspan x="307" y="314">
                  F
                </tspan>
                <tspan x="347" y="364">
                  G
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="small"
              >
                <tspan x="8" y="55">
                  92+
                </tspan>
                <tspan x="8" y="105">
                  81-91
                </tspan>
                <tspan x="8" y="155">
                  69-80
                </tspan>
                <tspan x="8" y="205">
                  55-68
                </tspan>
                <tspan x="8" y="255">
                  39-54
                </tspan>
                <tspan x="8" y="305">
                  21-38
                </tspan>
                <tspan x="8" y="355">
                  1-20
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="8"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Score
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="85"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Energy rating
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="460"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Current
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="565"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Potential
              </text>

              <svg
                aria-hidden="true"
                x="415"
                y={calculateY(data?.CURRENT_ENERGY_RATING)}
                width="90"
                height="50"
                class="rating-current rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  class="band-b"
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.CURRENT_ENERGY_EFFICIENCY}{" "}
                  {data?.CURRENT_ENERGY_RATING}
                </text>
              </svg>

              <svg
                aria-hidden="true"
                x="515"
                y={calculateY(data?.POTENTIAL_ENERGY_RATING)}
                width="90"
                height="50"
                class="rating-potential rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  class="band-a"
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.POTENTIAL_ENERGY_EFFICIENCY}{" "}
                  {data?.POTENTIAL_ENERGY_RATING}
                </text>
              </svg>
            </svg>
          </div>

          <div className="hidden sm:block md:hidden">
            <svg
              width="215"
              height="146"
              viewBox="0 0 615 376"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="svg-title svg-desc"
              role="img"
              class="epc-energy-rating-graph"
            >
              <title id="svg-title">Energy efficiency chart</title>
              <desc id="svg-desc">
                This property’s current energy rating is B with a score of 83.
                It has a potential energy rating of A with a score of 94.
              </desc>

              <line
                x1="72"
                y1="0"
                x2="72"
                y2="376"
                className="inner-border"
              ></line>
              <line
                x1="410"
                y1="0"
                x2="410"
                y2="376"
                class="inner-border"
              ></line>
              <line
                x1="510"
                y1="0"
                x2="510"
                y2="376"
                class="inner-border"
              ></line>
              <line x1="0" y1="25" x2="615" y2="25" class="inner-border"></line>
              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>

              <line x1="0" y1="0" x2="615" y2="0" class="inner-border"></line>
              <line x1="0" y1="0" x2="0" y2="376" class="inner-border"></line>
              <line
                x1="615"
                y1="376"
                x2="615"
                y2="0"
                class="inner-border"
              ></line>
              <line
                x1="615"
                y1="376"
                x2="0"
                y2="376"
                class="inner-border"
              ></line>

              <rect width="78" height="50" x="72" y="25" class="band-a"></rect>
              <rect width="118" height="50" x="72" y="75" class="band-b"></rect>
              <rect
                width="158"
                height="50"
                x="72"
                y="125"
                class="band-c"
              ></rect>
              <rect
                width="198"
                height="50"
                x="72"
                y="175"
                class="band-d"
              ></rect>
              <rect
                width="238"
                height="50"
                x="72"
                y="225"
                class="band-e"
              ></rect>
              <rect
                width="278"
                height="50"
                x="72"
                y="275"
                class="band-f"
              ></rect>
              <rect
                width="318"
                height="50"
                x="72"
                y="325"
                class="band-g"
              ></rect>

              <rect
                width="72"
                height="50"
                x="0"
                y="25"
                class="band-a-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="75"
                class="band-b-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="125"
                class="band-c-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="175"
                class="band-d-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="225"
                class="band-e-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="275"
                class="band-f-score"
              ></rect>
              <rect
                width="72"
                height="50"
                x="0"
                y="325"
                class="band-g-score"
              ></rect>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="letter"
              >
                <tspan x="107" y="64">
                  A
                </tspan>
                <tspan x="147" y="114">
                  B
                </tspan>
                <tspan x="187" y="164">
                  C
                </tspan>
                <tspan x="227" y="214">
                  D
                </tspan>
                <tspan x="267" y="264">
                  E
                </tspan>
                <tspan x="307" y="314">
                  F
                </tspan>
                <tspan x="347" y="364">
                  G
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="0"
                y="0"
                class="small"
              >
                <tspan x="8" y="55">
                  92+
                </tspan>
                <tspan x="8" y="105">
                  81-91
                </tspan>
                <tspan x="8" y="155">
                  69-80
                </tspan>
                <tspan x="8" y="205">
                  55-68
                </tspan>
                <tspan x="8" y="255">
                  39-54
                </tspan>
                <tspan x="8" y="305">
                  21-38
                </tspan>
                <tspan x="8" y="355">
                  1-20
                </tspan>
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="8"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Score
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="85"
                y="15"
                class="small"
                dominant-baseline="middle"
              >
                Energy rating
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="460"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Current
              </text>

              <text
                role="presentation"
                aria-hidden="true"
                x="565"
                y="15"
                class="small"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                Potential
              </text>

              <svg
                aria-hidden="true"
                x="415"
                y={calculateY(data?.CURRENT_ENERGY_RATING)}
                width="90"
                height="50"
                class="rating-current rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  class="band-b"
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.CURRENT_ENERGY_EFFICIENCY}{" "}
                  {data?.CURRENT_ENERGY_RATING}
                </text>
              </svg>

              <svg
                aria-hidden="true"
                x="515"
                y={calculateY(data?.POTENTIAL_ENERGY_RATING)}
                width="90"
                height="50"
                class="rating-potential rating-label"
              >
                <polygon
                  points="0,25 25,50 100,50 100,0 25,0 0,25"
                  class="band-a"
                ></polygon>
                <text x="20" y="31" class="govuk-!-font-weight-bold">
                  {data?.POTENTIAL_ENERGY_EFFICIENCY}{" "}
                  {data?.POTENTIAL_ENERGY_RATING}
                </text>
              </svg>
            </svg>
          </div>
        </>
      )}
    </>
  );
};

export default ECPBarChart;
