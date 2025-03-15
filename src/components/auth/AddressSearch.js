import React, { useState } from "react";

const AddressSearch = ({ setLocation, setLatitude, setLongitude }) => {
  const [query, setQuery] = useState("");
  const [addressResults, setAddressResults] = useState([]);

  const searchAddress = async (query) => {
    if (!query.trim()) {
      setAddressResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/search-address?query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error(`API 오류 발생: ${response.status}`);

      const data = await response.json();
      setAddressResults(
        data.addresses.map((item) => ({
          address_name: item.roadAddress || item.jibunAddress,
          lat: item.y,
          lng: item.x,
        }))
      );
    } catch (error) {
      console.error("❌ 주소 검색 실패:", error);
    }
  };

  const handleSelectAddress = (address, locationData) => {
    setLocation(address);
    setLatitude(locationData.lat);
    setLongitude(locationData.lng);
    setQuery("");
    setAddressResults([]);
  };

  return (
    <div className="form-group">
      <label>위치:</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="도로명 주소 입력"
      />
      <button onClick={() => searchAddress(query)}>검색</button>
      <ul className="address-results">
        {addressResults.map((item, index) => (
          <li
            key={index}
            onClick={() =>
              handleSelectAddress(item.address_name, {
                lat: item.lat,
                lng: item.lng,
              })
            }
          >
            {item.address_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSearch;
