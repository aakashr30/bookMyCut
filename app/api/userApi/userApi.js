export const fetchUserRegister = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append((key, data[key]));
    });
    const response = await fetch(
      "https://dashboard.render.com/api/auth/shop/register",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to register");
    }
    return await response.json();
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something went wrong",
    });
  }
};
