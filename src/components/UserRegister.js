import React, { useState, useEffect } from "react";
import "../css/UserRegister.css";

const UserRegister = () => {
  const [businessType, setBusinessType] = useState("본점");
  const [businessName, setBusinessName] = useState("");
  const [sponsorshipYn] = useState("N");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [posLoginId, setPosLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [addressResults, setAddressResults] = useState([]);

  // 📌 네이버 API를 이용한 주소 검색
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

      if (!response.ok) {
        throw new Error(`API 오류 발생: ${response.status}`);
      }

      const data = await response.json();

      if (data.addresses.length > 0) {
        setAddressResults(
          data.addresses.map((item) => ({
            address_name: item.roadAddress || item.jibunAddress, // 도로명 주소 우선
            lat: item.y,
            lng: item.x,
          }))
        );
      } else {
        console.warn("🔍 검색 결과 없음");
        setAddressResults([]);
      }
    } catch (error) {
      console.error("❌ 주소 검색 실패:", error);
    }
  };

  // 주소 입력 핸들러
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      searchAddress(value);
    } else {
      setAddressResults([]);
    }
  };

  // 주소 선택 시 적용
  const handleSelectAddress = (address, locationData) => {
    console.log("📍 선택한 주소:", address);
    setLocation(address);
    setLatitude(locationData.lat);
    setLongitude(locationData.lng);
    setQuery("");
    setAddressResults([]);
  };

  // 유저 등록 처리
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

    try {
      const response = await fetch("http://localhost:8080/api/pos/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // 응답이 실패(400 Bad Request 등)일 경우
      if (!response.ok) {
        const errorData = await response.json(); // 서버에서 보낸 오류 메시지를 JSON으로 읽기
        throw new Error(errorData.error || "등록 실패");
      }

      const result = await response.json(); // 성공 응답 JSON 파싱
      setMessage(result.message); // 성공 메시지 표시
      console.log("✅ 서버 응답:", result);
    } catch (error) {
      console.error("❌ 유저 등록 실패:", error);
      setMessage("유저 등록 실패: " + error.message); // 오류 메시지를 화면에 표시
    }
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

        <div className="form-group">
          <label>위치:</label>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="도로명 주소를 입력하세요"
          />
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
