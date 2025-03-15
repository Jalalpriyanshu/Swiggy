import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";
import MenuCard from "./MenuCard";

export default function Restaurant() {
  const [RestData, setRestData] = useState([]);
  const [foodselected, setFoodSelected] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const proxyAPI =
          "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";

        const response = await fetch(proxyAPI);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        const restaurants =
          data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setRestData(restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRestData([]); // Ensure RestData is always an array
      }
    }

    fetchData();
  }, []);

  // Shimmer Effect
  if (!RestData || RestData.length === 0) return <Shimmer />;

  return (
    <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
      {RestData.map((restInfo) => (
        <RestCard key={restInfo?.info?.id} restInfo={restInfo} />
      ))}

      {/* Render MenuCard with food filter buttons */}
      <MenuCard menuItems={{ title: "Menu", itemCards: [] }} foodselected={foodselected} setFoodSelected={setFoodSelected} />
    </div>
  );
}

