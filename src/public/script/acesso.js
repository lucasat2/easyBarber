document.getElementById("logoutButton").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/api/logout", {
    method: "POST",
    credentials: "include",
  });

  if (response.ok) {
    window.location.href = "/";
  } else {
    alert("Erro ao sair!");
  }
});
