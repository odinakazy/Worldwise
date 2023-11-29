import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function City() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div>
      City{id}
      <h1>Map reading from url </h1>
      <h4>{lat}</h4>
      <h4>{lng}</h4>
    </div>
  );
}

export default City;
