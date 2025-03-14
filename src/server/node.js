import express from "express";
import fetch from "node-fetch";
import cors from "cors";

import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

// 현재 파일의 디렉토리 경로 구하기
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// .env 파일 로드
dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
const PORT = 5000;

app.use(cors()); // CORS 허용

// 네이버 Geocoding API 프록시 엔드포인트
app.get("/search-address", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "주소를 입력하세요." });
  }

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 프록시 서버 실행 중: http://localhost:${PORT}`);
});
