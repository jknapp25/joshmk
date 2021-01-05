import React, { useState, useCallback, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import goat from "../assets/goat.png";
import bike from "../assets/bike.png";
import crocodile from "../assets/crocodile.png";
import pegasus from "../assets/pegasus.png";
import crab from "../assets/crab.png";
import train from "../assets/train.png";
import pin from "../assets/pin.png";
import pinOrange from "../assets/pinOrange.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default RideWithGoats;

const imgDim = "50px";

const obs = { pegasus: pegasus, goat: goat };

const route = [
  {
    description: "Born",
    position: [33.7, 242.15],
    location: "Irvine, CA",
    zoom: 11,
    animateDuration: 2,
  },
  {
    description: "Moved to Northern California",
    position: [39.03848190146999, 238.94723883553556],
    location: "Auburn, CA",
    zoom: 14,
    animateDuration: 3,
  },
  {
    description: "Taikwando with Master Sparling",
    position: [39.04385525319721, 238.92019708470275],
    location: "Auburn, CA",
    zoom: 14,
    animateDuration: 1,
  },
  {
    description: "Moved into the trees",
    position: [39.25772202889419, 239.0522031873177],
    location: "Nevada City, CA",
    zoom: 13,
    animateDuration: 2,
  },
  {
    description: "Started endurance running",
    position: [39.259070444377215, 239.96087282226563],
    location: "Tahoe, CA",
    zoom: 10,
    animateDuration: 2,
  },
  {
    description: "College at Oregon State University",
    position: [44.565543148671274, 236.716110237839],
    location: "Corvallis, OR",
    zoom: 14,
    animateDuration: 2,
  },
  {
    description: "Started a business",
    position: [45.52022746753431, 237.32211362588654],
    location: "Portland, OR",
    zoom: 14,
    animateDuration: 2,
  },
  {
    description: "Started a church",
    position: [45.5539487899847, 237.33706196023283],
    location: "Portland, OR",
    zoom: 13,
    animateDuration: 2,
  },
  {
    description: "Working for a dutch company",
    position: [51.42064838089292, 365.4053088618879],
    location: "Veldhoven, NL",
    zoom: 12,
    animateDuration: 2,
  },
  {
    description: "Got married",
    position: [45.330300915, 237.006482349866],
    location: "Newberg, OR",
    zoom: 13,
    animateDuration: 2,
  },
  {
    description: "Adventure to Costa Rica",
    position: [9.659976893509427, 277.25303133601216],
    location: "Puerto Viejo de Talamance, Costa Rica",
    zoom: 11,
    animateDuration: 3,
  },
  {
    description: "Opened/closed an art boutique",
    position: [45.55929337528038, 237.35185199868823],
    location: "Portland, OR",
    zoom: 16,
    animateDuration: 2,
  },
  {
    description: "Moved into a little ADU / COVID fortress",
    position: [45.553373439823126, 237.33035915096616],
    location: "Portland, OR",
    zoom: 15,
    animateDuration: 1,
  },
];

function RideWithGoats() {
  const pinIcon = L.icon({
    iconUrl: pin,
    iconSize: [38, 38],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });
  const pinIconOrange = L.icon({
    iconUrl: pinOrange,
    iconSize: [38, 38],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });

  const [map, setMap] = useState(null);
  const [travelMode, setTravelMode] = useState("goat");
  const [activePlaceIdx, setActivePlaceIdx] = useState(null);

  const onMove = useCallback(() => {
    // console.log(map.getCenter());
  }, [map]);

  useEffect(() => {
    if (map) {
      map.on("move", onMove);
    }
    return () => {
      if (map) {
        map.off("move", onMove);
      }
    };
  }, [map, onMove]);

  return (
    <Col className="pr-0">
      <Row>
        <Col
          lg={3}
          className="bg-light px-0"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Row className="ml-3 mt-3 mr-3 mb-1">
            <h2 className="d-block">Josh's Life Route</h2>
            <h5 className="mt-3">Select travel mode</h5>
          </Row>
          <Row>
            <Table style={{ zIndex: 1000 }}>
              <tbody>
                <tr>
                  <td
                    align="center"
                    className={`${
                      travelMode === "goat" ? "orange" : "hover-gray"
                    } border-0 cursor-pointer`}
                    onClick={() => setTravelMode("goat")}
                  >
                    <img
                      alt="goat"
                      src={goat}
                      style={{ height: imgDim, width: imgDim }}
                      title="Goat"
                    />
                  </td>
                  <td
                    align="center"
                    className={`${
                      travelMode === "pegasus" ? "orange" : "hover-gray"
                    } border-0 cursor-pointer`}
                    onClick={() => setTravelMode("pegasus")}
                  >
                    <img
                      alt="pegasus"
                      src={pegasus}
                      style={{ height: imgDim, width: imgDim }}
                      title="Pegasus"
                    />
                  </td>
                  <td align="center" className="premium border-0">
                    <img
                      alt="bike"
                      src={bike}
                      style={{ height: imgDim, width: imgDim }}
                      title="Bike"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="center" className="premium border-0">
                    <img
                      alt="crab"
                      src={crab}
                      style={{ height: imgDim, width: imgDim }}
                      title="Crab"
                    />
                  </td>
                  <td align="center" className="premium border-0">
                    <img
                      alt="crocodile"
                      src={crocodile}
                      style={{ height: imgDim, width: imgDim }}
                      title="Crocodile"
                    />
                  </td>
                  <td align="center" className="premium border-0">
                    <img
                      alt="train"
                      src={train}
                      style={{ height: imgDim, width: imgDim }}
                      title="Hyperloop"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="ml-3 mr-3 mt-3 mb-1">
            <h5>Route</h5>
          </Row>
          <Table>
            <tbody>
              {route.map(
                (
                  { description, position, zoom, location, animateDuration },
                  i
                ) => (
                  <tr
                    key={i}
                    className={`${
                      activePlaceIdx !== null && activePlaceIdx === i
                        ? "orange"
                        : "hover-gray"
                    } cursor-pointer`}
                    onClick={() => {
                      map.setView(position, zoom, {
                        animate: true,
                        duration: animateDuration,
                        easeLinearity: 0.5,
                      });
                      setActivePlaceIdx(i);
                    }}
                  >
                    <td className="pl-3 align-middle">{i + 1}</td>
                    <td style={{ lineHeight: "1.1em" }}>
                      <div style={{ fontSize: "16px" }}>{description}</div>
                      <small className="text-muted">{location}</small>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
        <Col lg={9} className="h-100 pl-0">
          <MapContainer
            center={[39.86231722624386, 242.56914339360512]}
            zoom={5}
            scrollWheelZoom={false}
            zoomControl={false}
            whenCreated={setMap}
            style={{ height: "100vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {route.map(({ position }, i) => (
              <Marker
                key={i}
                position={position}
                icon={
                  activePlaceIdx !== null && activePlaceIdx === i
                    ? pinIconOrange
                    : pinIcon
                }
              ></Marker>
            ))}
            <ZoomControl position="bottomright" />
          </MapContainer>

          <img
            alt={travelMode}
            src={obs[travelMode]}
            title={travelMode}
            style={{
              top: "51.5%",
              left: "61.5%",
              position: "fixed",
              zIndex: 1000000000,
              width: "30px",
              height: "30px",
            }}
          />
        </Col>
      </Row>
    </Col>
  );
}
