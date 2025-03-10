// src/components/UserRegister.js
import React, { useState } from "react";
import axios from "axios";
import "../css/UserRegister.css";

const UserRegister = () => {
  const [businessType, setBusinessType] = useState("본점");
  const [businessName, setBusinessName] = useState("");
  const [sponsorshipYn, setSponsorshipYn] = useState("N");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [posLoginId, setPosLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [addressResults, setAddressResults] = useState([]);
  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setMessage("비밀번호를 입력하세요.");
      return;
    }

    const data = {
      business: {
        businessType,
        businessName,
        sponsorshipYn,
      },
      pos: {
        location,
        latitude: parseFloat(latitude).toFixed(6),
        longitude: parseFloat(longitude).toFixed(6),
        posLoginId,
        posPassword: password,
      },
    };

    console.log("📤 서버로 전송할 데이터:", data); // 🚀 전송 데이터 확인

    try {
      const response = await axios.post(
        "http://localhost:8080/api/pos/register",
        data
      );

      console.log("✅ 서버 응답:", response.data); // 🚀 서버 응답 확인
      setMessage("유저 등록 성공!");
    } catch (error) {
      console.error("❌ 유저 등록 실패:", error.response?.data || error);
      setMessage("유저 등록 실패: " + (error.response?.data || "서버 오류"));
    }
  };

  const searchAddress = async (query) => {
    try {
      console.log("🔍 Google API 검색어:", query);
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: query,
            key: googleMapsKey,
          },
        }
      );
      console.log("📍 Google API 응답:", response.data.results);
      setAddressResults(response.data.results);
    } catch (error) {
      console.error("❌ 주소 검색 실패:", error);
    }
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      searchAddress(value);
    } else {
      setAddressResults([]);
    }
  };

  const handleSelectAddress = (address, locationData) => {
    console.log(
      "📍 선택한 주소:",
      address,
      "위도:",
      locationData.lat,
      "경도:",
      locationData.lng
    );
    setLocation(address);
    setLatitude(locationData.lat);
    setLongitude(locationData.lng);
    setQuery("");
    setAddressResults([]);
  };

  return (
    <div className="register-container">
      <h2>유저 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>사업자 유형:</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          >
            <option value="본점">본점</option>
            <option value="가맹점">가맹점</option>
            <option value="개인">개인</option>
          </select>
        </div>
        <div className="form-group">
          <label>사업장 이름:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        <input type="hidden" value={sponsorshipYn} readOnly />

        <div className="form-group">
          <label>위치:</label>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="주소를 입력하세요"
          />
          <ul className="address-results">
            {addressResults.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSelectAddress(
                    item.formatted_address,
                    item.geometry.location
                  )
                }
              >
                {item.formatted_address}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={location}
            readOnly
            placeholder="선택한 주소"
          />
        </div>

        <input type="hidden" value={latitude} readOnly />
        <input type="hidden" value={longitude} readOnly />

        <div className="form-group">
          <label>이메일 (POS 로그인 ID):</label>
          <input
            type="email"
            value={posLoginId}
            onChange={(e) => setPosLoginId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UserRegister;
