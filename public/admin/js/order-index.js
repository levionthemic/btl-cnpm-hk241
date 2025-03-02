const divs = document.querySelectorAll(".nav-item .nav-link");

const url = new URL(window.location.href);
const result = url.searchParams.get("result");

switch (result) {
  case "printing":
    for (let div of divs) {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
        break;
      }
    }
    divs[1].classList.add("active");
    break;
  case "printed":
    for (let div of divs) {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
        break;
      }
    }
    divs[2].classList.add("active");
    break;
  case "failed":
    for (let div of divs) {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
        break;
      }
    }
    divs[3].classList.add("active");
    break;

  default:
    for (let div of divs) {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
        break;
      }
    }
    divs[0].classList.add("active");
    break;
}

const printerIdLis = document.querySelectorAll(
  ".printer-id-dropdown-menu .dropdown-item"
);

printerIdLis.forEach((printerIdLi, i) => {
  printerIdLi.addEventListener("click", () => {
    const printerId = printerIdLi.innerText;
    // console.log(printerId);
    if (i != 0) {
      url.searchParams.set("page", "1");
      url.searchParams.set("printerId", printerId);
      window.location.href = url.href;
    } else {
      url.searchParams.delete("printerId");
      window.location.href = url.href;
    }
  });
});

const resultNavs = document.querySelectorAll(".nav-item .nav-link");

resultNavs.forEach((resultNav, i) => {
  resultNav.addEventListener("click", () => {
    switch (i) {
      case 1:
        url.searchParams.set("page", "1");
        url.searchParams.set("result", "printing");
        window.location.href = url.href;
        break;
      case 2:
        url.searchParams.set("page", "1");
        url.searchParams.set("result", "printed");
        window.location.href = url.href;
        break;
      case 3:
        url.searchParams.set("page", "1");
        url.searchParams.set("result", "failed");
        window.location.href = url.href;
        break;
      default:
        url.searchParams.delete("result");
        window.location.href = url.href;
        break;
    }
  });
});
