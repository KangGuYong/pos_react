const API_URL = "http://localhost:8080/api/menu";

export const getMenuItems = async () => {
  const response = await fetch("http://localhost:8080/api/menu", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const textResponse = await response.text(); // ✅ 응답을 문자열로 출력해보기
  console.log("📥 서버 응답:", textResponse); // ✅ 콘솔에서 확인

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  try {
    return JSON.parse(textResponse); // ✅ JSON 파싱 시도
  } catch (error) {
    console.error("❌ JSON 파싱 오류:", error);
    throw new Error("서버 응답이 올바른 JSON 형식이 아닙니다.");
  }
};

export const addMenuItem = async (menuItem) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error("메뉴 등록 실패");
  }

  return response.json();
};
