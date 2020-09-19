import GoogleMapReact from "google-map-react";
import { Alum } from "models";
import React from "react";
import { parseAlumni } from "services";
import "./MapView.scss";

interface MapViewProps {
  mapType: "careers" | "alumni" | "study-abroad";
}

export function MapView({ mapType }: MapViewProps): JSX.Element {
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBhvXuBAQBCLHxhM-2QWnYRxDlZ4oZhDhg" }}
        defaultCenter={{
          lat: 39.381266,
          lng: -97.922211,
        }}
        defaultZoom={4}
        options={{ maxZoom: 6 }}
      >
        {mapType === "alumni" &&
          parseAlumni().map(alum => {
            return <AlumPin alum={alum} key={alum.id} lat={alum.latitude} lng={alum.longitude} />;
          })}
      </GoogleMapReact>
    </div>
  );
}

interface AlumPinProps {
  alum: Alum;
  lat: number;
  lng: number;
}

function AlumPin({ alum }: AlumPinProps): JSX.Element {
  return (
    <span>
      {alum.firstName} {alum.lastName}
    </span>
  );
}
