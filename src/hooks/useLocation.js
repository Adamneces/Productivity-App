import { useState, useEffect } from "react";

const useLocation = () => {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ latitude, longitude });
            },
            (error) => {
              console.log("Error getting user location:", error.message);
            }
          );
        } else {
          window.alert("Geolocation is not supported in this browser");
        }
      }, []);

      return userLocation;
}

export default useLocation
