const lis = document.querySelectorAll(".dropdown-item");

const url = new URL(window.location.href);

lis[0].addEventListener("click", () => {
  url.searchParams.delete("time");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[1].addEventListener("click", () => {
  url.searchParams.set("time", "month");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[2].addEventListener("click", () => {
  url.searchParams.set("time", "today");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});


