document.getElementById("logoutButton").addEventListener("click", async () => {
  const response = await fetch("/api/logout", {
    method: "POST",
    credentials: "include",
  });

  if (response.ok) {
    window.location.href = "/";
  } else {
    alert("Erro ao sair!");
  }
});