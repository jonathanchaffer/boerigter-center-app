import GoogleMapReact from "google-map-react";
import { Alum } from "models";
import React, { useState } from "react";
import { parseAlumni } from "services";
import { ClusterProperties, PointFeature } from "supercluster";
import useSupercluster from "use-supercluster";
import "./MapView.scss";

interface MapViewProps {
  mapType: "careers" | "alumni" | "study-abroad";
}

export function MapView({ mapType }: MapViewProps): JSX.Element {
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  const points: PointFeature<Alum>[] = parseAlumni().map((alum: Alum) => {
    return {
      geometry: { coordinates: [alum.longitude, alum.latitude], type: "Point" },
      properties: alum,
      type: "Feature",
    };
  });

  const { clusters } = useSupercluster({
    bounds: mapBounds,
    options: { maxZoom: 20, radius: 75 },
    points,
    zoom: mapZoom,
  });

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBhvXuBAQBCLHxhM-2QWnYRxDlZ4oZhDhg" }}
        defaultCenter={{
          lat: 39.381266,
          lng: -97.922211,
        }}
        zoom={mapZoom}
        options={{ maxZoom: 6 }}
        onChange={({ zoom, bounds }) => {
          setMapZoom(zoom);
          setMapBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
        }}
      >
        {clusters.map(pointOrCluster => {
          const [longitude, latitude] = pointOrCluster.geometry.coordinates;

          const cluster = pointOrCluster as PointFeature<ClusterProperties>;
          const { cluster: isCluster, point_count: pointCount } = cluster.properties;

          const point = pointOrCluster as PointFeature<Alum>;
          const alum = point.properties;

          return isCluster ? (
            <ClusterPin count={pointCount} key={cluster.id} lat={latitude} lng={longitude} />
          ) : (
            <AlumPin alum={alum} key={alum.id} lat={latitude} lng={longitude} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

interface ClusterPinProps {
  count: number;
  lat: number;
  lng: number;
}

function ClusterPin({ count }: ClusterPinProps): JSX.Element {
  return <span>{count}</span>;
}

interface AlumPinProps {
  alum: Alum;
  lat: number;
  lng: number;
}

function AlumPin({ alum }: AlumPinProps): JSX.Element {
  return <i className="fas fa-user" />;
}
