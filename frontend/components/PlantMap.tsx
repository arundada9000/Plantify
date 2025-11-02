"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Plant {
  location: [number, number]; // [lng, lat]
  plantedDate: string;
  plantImage: string;
}

interface Person {
  id: number;
  name: string;
  image: string;
  plants: Plant[];
}


// Updated dummy data
const dummyPeople: Person[] = [
  {
    id: 1,
    name: "Baal Gobin",
    image: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Andrea",
    plants: [
      {
        plantedDate: "2020-03-15",
        location: [83.4581, 27.6943],
        plantImage: "/trees/tree1.jpeg",
      },
      {
        plantedDate: "2021-01-10",
        location: [83.4698, 27.7062],
        plantImage: "/trees/tree1.jpeg",
      },
    ],
  },
  {
    id: 2,
    name: "Neupane Arun",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn",
    plants: [
      {
        plantedDate: "2019-08-10",
        location: [83.4457, 27.7135],
        plantImage: "/trees/tree1.jpeg",
      },
      {
        plantedDate: "2020-09-22",
        location: [83.4322, 27.724],
        plantImage: "/trees/tree1.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Aayush Chapagain",
    image: "https://api.dicebear.com/9.x/micah/svg?seed=Destiny",
    plants: [
      {
        plantedDate: "2021-01-05",
        location: [83.4774, 27.6892],
        plantImage: "/trees/tree1.jpeg",
      },
      {
        plantedDate: "2022-06-12",
        location: [83.4848, 27.6765],
        plantImage: "/trees/tree1.jpeg",
      },
    ],
  },
  {
    id: 4,
    name: "Bibek Bhusal",
    image: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sophia",
    plants: [
      {
        plantedDate: "2018-06-20",
        location: [83.4609, 27.7294],
        plantImage: "/trees/tree1.jpeg",
      },
      {
        plantedDate: "2019-11-02",
        location: [83.4721, 27.738],
        plantImage: "/trees/tree1.jpeg",
      },
    ],
  },
  {
    id: 5,
    name: "Kalpit",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Mason",
    plants: [
      {
        plantedDate: "2022-11-12",
        location: [83.4365, 27.6937],
        plantImage: "/trees/tree1.jpeg",
      },
      {
        plantedDate: "2023-05-08",
        location: [83.4489, 27.6841],
        plantImage: "/trees/tree1.jpeg",
      },
    ],
  },
  {
    id: 6,
    name: "Pooja Pandey",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria",
    plants: [
      {
        plantedDate: "2022-11-12",
        location: [83.4547, 27.7198],
        plantImage: "/trees/tree1.jpeg",
      },
      {
        plantedDate: "2023-01-15",
        location: [83.4641, 27.7275],
        plantImage: "/trees/tree1.jpeg",
      },
    ],
  },
];


const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const userLocationRef = useRef<[number, number] | null>(null);
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [83.4667, 27.7001],
      zoom: 13,
      attributionControl: false,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLng = pos.coords.longitude;
          const userLat = pos.coords.latitude;
          userLocationRef.current = [userLng, userLat];
          setForceUpdate((n) => n + 1);

          new maplibregl.Marker({ color: "blue" })
            .setLngLat([userLng, userLat])
            .setPopup(new maplibregl.Popup().setText("📍 You are here"))
            .addTo(map.current!);

          map.current!.flyTo({ center: [userLng, userLat], zoom: 14 });
        },
        (err) => alert(`Location error: ${err.message}`),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    // Locate Control
    class LocateControl {
      onAdd(mapInstance: maplibregl.Map) {
        const btn = document.createElement("button");
        btn.className =
          "maplibregl-ctrl-icon maplibregl-ctrl-locate bg-white rounded p-2 text-lg shadow";
        btn.type = "button";
        btn.title = "Locate Me";
        btn.innerHTML = "📍";
        btn.onclick = () => {
          if (userLocationRef.current) {
            mapInstance.flyTo({ center: userLocationRef.current, zoom: 14 });
          } else {
            alert("User location not found yet.");
          }
        };
        const container = document.createElement("div");
        container.className = "maplibregl-ctrl maplibregl-ctrl-group";
        container.appendChild(btn);
        return container;
      }
      onRemove() {}
    }

    map.current.addControl(new LocateControl(), "top-left");

    // Add dummy markers with images
    // Add markers for each person's plants
    dummyPeople.forEach((person) => {
      person.plants.forEach((plant, index) => {
        // --- Create marker element ---
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.style.display = "flex";
        markerEl.style.flexDirection = "column";
        markerEl.style.alignItems = "center";
        markerEl.style.justifyContent = "center";
        markerEl.style.gap = "2px";
        markerEl.style.cursor = "pointer";
        markerEl.style.transform = "translateY(-10px)";

        // 🌳 Tree emoji for the marker (top)
        const emoji = document.createElement("div");
        emoji.textContent = "🌳";
        emoji.style.fontSize = "22px";
        emoji.style.lineHeight = "1";
        emoji.style.userSelect = "none";

        // 👤 Person image (bottom)
        const avatar = document.createElement("img");
        avatar.src = person.image;
        avatar.alt = person.name;
        avatar.style.width = "30px";
        avatar.style.height = "30px";
        avatar.style.borderRadius = "50%";
        avatar.style.objectFit = "cover";
        avatar.style.border = "2px solid white";
        avatar.style.boxShadow = "0 0 4px rgba(0,0,0,0.3)";

        markerEl.appendChild(emoji);
        markerEl.appendChild(avatar);

        // --- Create popup content (beautiful modern style) ---
        const popupContent = document.createElement("div");
        popupContent.style.fontFamily = "'Inter', system-ui, sans-serif";
        popupContent.style.maxWidth = "260px";
        popupContent.style.background = "#fff";
        popupContent.style.borderRadius = "12px";
        popupContent.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        popupContent.style.padding = "12px";
        popupContent.style.overflow = "hidden";
        popupContent.style.transition = "all 0.3s ease";
        popupContent.style.textAlign = "center";

        popupContent.innerHTML = `
      <h3 style="
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin: 4px 0 8px;
          letter-spacing: 0.2px;
        ">
        ${person.name}
      </h3>

      <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 8px;
        ">
        🌳 Tree #${index + 1}
      </div>

      <p style="
          font-size: 14px;
          color: #374151;
          margin: 0;
          padding: 0;
          font-weight: 500;
        ">
        <span style="color:#6b7280; font-weight:400;">Planted on:</span> ${
          plant.plantedDate
        }
      </p>
    `;

        // --- Add plant image if available ---
        if (plant.plantImage) {
          const plantImg = document.createElement("img");
          plantImg.src = plant.plantImage;
          plantImg.alt = "Planted Tree";
          plantImg.style.width = "100%";
          plantImg.style.height = "auto";
          plantImg.style.borderRadius = "10px";
          plantImg.style.marginTop = "10px";
          plantImg.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          plantImg.style.transition = "transform 0.3s ease";
          plantImg.onmouseenter = () =>
            (plantImg.style.transform = "scale(1.03)");
          plantImg.onmouseleave = () => (plantImg.style.transform = "scale(1)");
          popupContent.appendChild(plantImg);
        } else {
          const msg = document.createElement("p");
          msg.textContent = "🌱 No plant image available";
          msg.style.color = "#9ca3af";
          msg.style.fontSize = "13px";
          msg.style.marginTop = "10px";
          popupContent.appendChild(msg);
        }

        // --- Add Show Path button ---
        const btn = document.createElement("button");
        btn.id = `path-btn-${person.id}-${index}`;
        btn.textContent = "Show Path";
        btn.style.padding = "8px 12px";
        btn.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.marginTop = "12px";
        btn.style.fontSize = "14px";
        btn.style.fontWeight = "500";
        btn.style.boxShadow = "0 2px 8px rgba(37, 99, 235, 0.3)";
        btn.style.transition = "all 0.2s ease-in-out";
        btn.onmouseenter = () => {
          btn.style.transform = "scale(1.05)";
          btn.style.boxShadow = "0 4px 10px rgba(37, 99, 235, 0.4)";
        };
        btn.onmouseleave = () => {
          btn.style.transform = "scale(1)";
          btn.style.boxShadow = "0 2px 8px rgba(37, 99, 235, 0.3)";
        };
        popupContent.appendChild(btn);

        // --- Create popup and marker ---
        const popup = new maplibregl.Popup({ offset: 30 }).setDOMContent(
          popupContent
        );

        new maplibregl.Marker({ element: markerEl })
          .setLngLat(plant.location)
          .setPopup(popup)
          .addTo(map.current);

        // --- Button action (open Google Maps path) ---
        popup.on("open", () => {
          const pathBtn = document.getElementById(
            `path-btn-${person.id}-${index}`
          );
          if (pathBtn) {
            pathBtn.onclick = () => {
              if (!userLocationRef.current) {
                alert("User location not available yet.");
                return;
              }
              const [userLng, userLat] = userLocationRef.current;
              const [lng, lat] = plant.location;
              const gmapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`;
              window.open(gmapsUrl, "_blank");
            };
          }

          // Smooth fade-in effect when popup opens
          popupContent.style.opacity = "0";
          popupContent.style.transform = "translateY(8px)";
          setTimeout(() => {
            popupContent.style.transition = "all 0.4s ease";
            popupContent.style.opacity = "1";
            popupContent.style.transform = "translateY(0)";
          }, 30);
        });
      });
    });



  }, []);

  return <div ref={mapContainer} className="w-full h-screen" />;
};

export default MapPage;
