export const login = async (posLoginId, posPassword) => {
  const response = await fetch("http://localhost:8080/api/pos/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posLoginId, posPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "로그인 실패");
  }

  const { token } = await response.json();
  localStorage.setItem("token", token);
  return token;
};
