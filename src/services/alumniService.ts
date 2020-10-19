import { Alum } from "models";
import React, { useState } from "react";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

export function parseAlumni(): Alum[] {
  return placeholderAlumni.users as Alum[];
}

export function isLoggedIn(): boolean{
  return false;
}
