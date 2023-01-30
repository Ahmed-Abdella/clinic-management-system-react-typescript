import React from "react";

import { useParams } from "react-router-dom";

export default function Patient() {
  const { id } = useParams();
  console.log(id);

  return <div>Patient</div>;
}
