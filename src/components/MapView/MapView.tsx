import GoogleMapReact from "google-map-react";
import React from "react";
import "./MapView.scss";

export function MapView(): JSX.Element {
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
      />
    </div>
  );
}
