export const registerUser = async (data) => {
  const response = await fetch("http://localhost:8080/api/pos/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "등록 실패");
  }

  return await response.json();
};
