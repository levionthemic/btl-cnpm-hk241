const lis = document.querySelectorAll(".dropdown-item");

const url = new URL(window.location.href);

lis[0].addEventListener("click", () => {
  url.searchParams.delete("status");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[1].addEventListener("click", () => {
  url.searchParams.set("status", "using");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[2].addEventListener("click", () => {
  url.searchParams.set("status", "standby");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[3].addEventListener("click", () => {
  url.searchParams.delete("power");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[4].addEventListener("click", () => {
  url.searchParams.set("power", "on");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[5].addEventListener("click", () => {
  url.searchParams.set("power", "off");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});
