import { useState } from "react";

export const useUserRegister = () => {
  const [businessType, setBusinessType] = useState("본점");
  const [businessName, setBusinessName] = useState("");
  const [sponsorshipYn] = useState("N");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [posLoginId, setPosLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return {
    businessType,
    setBusinessType,
    businessName,
    setBusinessName,
    sponsorshipYn,
    location,
    setLocation,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    posLoginId,
    setPosLoginId,
    password,
    setPassword,
    message,
    setMessage,
  };
};
