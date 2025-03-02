const lis = document.querySelectorAll(".filter-dropdown-menu .dropdown-item");

url = new URL(window.location.href);
console.log(lis);

lis[0].addEventListener("click", () => {
  url.searchParams.delete("result");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[1].addEventListener("click", () => {
  url.searchParams.set("result", "printing");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[2].addEventListener("click", () => {
  url.searchParams.set("result", "printed");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});

lis[3].addEventListener("click", () => {
  url.searchParams.set("result", "failed");
  url.searchParams.set("page", "1");
  window.location.href = url.href;
});