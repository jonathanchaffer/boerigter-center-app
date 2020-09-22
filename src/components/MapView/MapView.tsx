import GoogleMapReact from "google-map-react";
import { Mappable } from "models/Mappable";
import React, { useState } from "react";
import { ClusterProperties, PointFeature } from "supercluster";
import useSupercluster from "use-supercluster";
import "./MapView.scss";

interface MapViewProps<I extends Mappable> {
  getData: () => I[];
}

export function MapView<I extends Mappable>({ getData }: MapViewProps<I>): JSX.Element {
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<[number, number, number, number]>([-1, -1, -1, -1]);

  const points: PointFeature<Mappable>[] = getData().map((item: I) => {
    return {
      geometry: { coordinates: [item.longitude, item.latitude], type: "Point" },
      properties: item,
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

          const point = pointOrCluster as PointFeature<Mappable>;
          const item = point.properties;

          return isCluster ? (
            <ClusterPin count={pointCount} key={cluster.id} lat={latitude} lng={longitude} />
          ) : (
            <ItemPin item={item} key={item.id} lat={latitude} lng={longitude} />
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

interface ItemPinProps<I extends Mappable> {
  item: I;
  lat: number;
  lng: number;
}

function ItemPin<I extends Mappable>({ item }: ItemPinProps<I>): JSX.Element {
  return <i className="fas fa-user" />;
}
