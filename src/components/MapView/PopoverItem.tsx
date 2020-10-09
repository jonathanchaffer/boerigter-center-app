import { Mappable } from "models/Mappable";
import React from "react";

interface PopoverItemProps<I extends Mappable> {
  item: I;
}

export function PopoverItem<I extends Mappable>({ item }: PopoverItemProps<I>): JSX.Element {
  return <div>{item.id}</div>;
}
