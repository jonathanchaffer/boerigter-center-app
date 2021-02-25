import { PopoverItem } from "components";
import { ErrorModal } from "components/reusables";
import GoogleMapReact from "google-map-react";
import { Mappable } from "models/Mappable";
import React, { useState } from "react";
import { useAsync } from "react-async";
import { ListGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { ClusterFeature, PointFeature } from "supercluster";
import useSupercluster from "use-supercluster";
import "./MapView.scss";

// tutorial followed for clustering: https://www.leighhalliday.com/google-maps-clustering

interface MapViewProps<I extends Mappable> {
  getData: () => Promise<I[]>;
  pos: "top" | "bottom";
}

export function MapView<I extends Mappable>({
  getData,
  pos,
}: MapViewProps<I>):
JSX.Element {
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<[number, number, number, number]>([-1, -1, -1, -1]);
  // const [mapStyle, setMapStyle] = useState(pos)
  const { data, error, isPending  } = useAsync({ promiseFn: getData });
  const fix = Object.values(pos).join("") as "top" | "bottom";

  const points: PointFeature<I>[] = data
    ? data.map((item: I) => {
        return {
          geometry: { coordinates: [item.longitude, item.latitude], type: "Point" },
          properties: item,
          type: "Feature",
        };
      })
    : [];

  const { clusters, supercluster } = useSupercluster({
    bounds: mapBounds,
    options: { maxZoom: 20, radius: 75 },
    points,
    zoom: mapZoom,
  });

  const navBarTopStyle = {
    // Just to be clear:
    // bottom: "0px",
    // top: "0px",
  };
  const navBarBottomStyle = {
    // bottom: "58px",
    top: "-58px",
    // bottom: "200px",
  };

  const divStyle = fix === "top" ? navBarTopStyle : navBarBottomStyle;
  // const divStyle = navBarBottomStyle;

  return (
    <>
      <div id="mapDiv" className="map-container" style={divStyle}>
      {isPending && (
        <div className="pending-map-container">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY || "" }}
          defaultCenter={{
            lat: 39.381266,
            lng: -97.922211,
          }}
          zoom={mapZoom}
          options={{ maxZoom: 10 }}
          onChange={({ zoom, bounds }) => {
            setMapZoom(zoom);
            setMapBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
          }}
        >
          {clusters.map(pointOrCluster => {
            /* Regardless of whether pointOrCluster is a PointFeature<ClusterProperties> or a PointFeature<I>, it has a
             * 'geometry' property that we can use to get the latitude and longitude. */
            const [longitude, latitude] = pointOrCluster.geometry.coordinates;

            /* If pointOrCluster is a ClusterFeature<I>, then it has 'cluster' and 'cluster_id' properties.
             * We can use these to display cluster information on the map. */
            const cluster = pointOrCluster as ClusterFeature<I>;
            const { cluster: isCluster, cluster_id: clusterId } = cluster.properties;

            /* Otherwise, pointOrCluster is just a PointFeature<I>, and its 'properties' property is the I object itself. */
            const point = pointOrCluster as PointFeature<I>;
            const item = point.properties;

            /* If isCluster, return the element that should display for cluster pins. Otherwise, return the element
             * that should display for item pins. */
            return isCluster ? (
              <ClusterPin
                id={cluster.id?.toString() ?? ""}
                items={supercluster?.getLeaves(clusterId, Infinity).map(pt => pt.properties) || []}
                totalNumPoints={clusters.length}
                key={cluster.id}
                lat={latitude}
                lng={longitude}
              />
            ) : (
              <ItemPin item={item} key={item.id} lat={latitude} lng={longitude} />
            );
          })}
        </GoogleMapReact>
      </div>
      </div>
      <ErrorModal error={error} />
    </>
  );
}

interface ClusterPinProps<I extends Mappable> {
  id: string;
  items: I[];
  totalNumPoints: number;
  lat: number;
  lng: number;
}

function ClusterPin<I extends Mappable>({
  id,
  items,
  totalNumPoints,
}: ClusterPinProps<I>): JSX.Element {
  // Calculate the size of the pin. Better done programatically than in CSS.
  const size = 25 + Math.min((items.length / totalNumPoints) * 20, 50);
  return (
    <PopoverTrigger popoverId={id} items={items}>
      <button
        type="button"
        className="cluster-marker"
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        <span>{items.length}</span>
      </button>
    </PopoverTrigger>
  );
}

interface ItemPinProps<I extends Mappable> {
  item: I;
  lat: number;
  lng: number;
}

function ItemPin<I extends Mappable>({ item }: ItemPinProps<I>): JSX.Element {
  let iconName;
  switch (item.type) {
    case "alum":
      iconName = "fas fa-user";
      break;
    case "career":
      iconName = "fas fa-briefcase";
      break;
    default:
      iconName = "fas fa-map-pin";
  }
  return (
    <PopoverTrigger popoverId={item.id.toString()} item={item}>
      <button type="button" className="point-marker">
        <i className={iconName} />
      </button>
    </PopoverTrigger>
  );
}

interface PopoverTriggerProps<I extends Mappable> {
  popoverId: string;
  item?: I;
  items?: I[];
  children: React.ReactElement;
}

function PopoverTrigger<I extends Mappable>({
  popoverId,
  item,
  items,
  children,
}: PopoverTriggerProps<I>): JSX.Element {
  return (
    <OverlayTrigger
      trigger="focus"
      placement="top"
      overlay={
        <Popover id={`popover-${popoverId.toString()}`} className="map-popover">
          <Popover.Content>
            {items ? (
              <ListGroup variant="flush">
                {items.map(i => (
                  <ListGroup.Item key={i.id}>
                    <PopoverItem item={i} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              item && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <PopoverItem item={item} />
                  </ListGroup.Item>
                </ListGroup>
              )
            )}
          </Popover.Content>
        </Popover>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
