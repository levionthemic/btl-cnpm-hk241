let pagePerDocument = document.querySelector("input#pagenum");
let documentCount = document.querySelector("input#copy");
let pageSize = document.querySelector("select[name='size']");
let printType = document.querySelector("select[name='printtype']");

var printPageUsed = document.querySelector(
  ".inner-print-checkout .num_page span"
);
var totalPrice = document.querySelector(
  ".inner-print-checkout .total_price span"
);

var fileInput = document.querySelector("input#filename");

const calculateCheckoutInfo = (
  printType,
  pagePerDocument,
  documentCount,
  pageSize
) => {
  let printPageUsed = pagePerDocument * documentCount;
  switch (pageSize) {
    case "A0":
      printPageUsed *= 16;
      break;
    case "A1":
      printPageUsed *= 8;
      break;
    case "A2":
      printPageUsed *= 4;
      break;
    case "A3":
      printPageUsed *= 2;
      break;
    default:
      printPageUsed *= 1;
      break;
  }

  const totalPrice =
    printPageUsed * (printType == "blackwhite" ? 1000 : 3000) + 6000;

  return { printPageUsed, totalPrice };
};

// fileInput.addEventListener("change", (e) => {
//   console.log(e);
//   const file = e.target.files[0];
//   // Xử lý file PDF
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     const arrayBuffer = event.target.result;
//     PDFJS.getDocument(arrayBuffer).promise.then((pdf) => {
//       console.log("Số trang: ", pdf.numPages);
//     });
//   };
//   reader.readAsArrayBuffer(file);
// });

printType.addEventListener("change", () => {
  const calc = calculateCheckoutInfo(
    printType.value,
    parseInt(pagePerDocument.value) || 0,
    parseInt(documentCount.value) || 0,
    pageSize.value
  );
  printPageUsed.textContent = calc.printPageUsed;
  totalPrice.innerHTML = calc.totalPrice.toLocaleString() + "<sup>đ</sup>";
});

pagePerDocument.addEventListener("change", () => {
  const calc = calculateCheckoutInfo(
    printType.value,
    parseInt(pagePerDocument.value) || 0,
    parseInt(documentCount.value) || 0,
    pageSize.value
  );
  printPageUsed.textContent = calc.printPageUsed;
  totalPrice.innerHTML = calc.totalPrice.toLocaleString() + "<sup>đ</sup>";
});

documentCount.addEventListener("change", () => {
  const calc = calculateCheckoutInfo(
    printType.value,
    parseInt(pagePerDocument.value) || 0,
    parseInt(documentCount.value) || 0,
    pageSize.value
  );
  console.log(calc);
  printPageUsed.textContent = calc.printPageUsed;
  totalPrice.innerHTML = calc.totalPrice.toLocaleString() + "<sup>đ</sup>";
});

pageSize.addEventListener("change", () => {
  const calc = calculateCheckoutInfo(
    printType.value,
    parseInt(pagePerDocument.value) || 0,
    parseInt(documentCount.value) || 0,
    pageSize.value
  );
  printPageUsed.textContent = calc.printPageUsed;
  totalPrice.innerHTML = calc.totalPrice.toLocaleString() + "<sup>đ</sup>";
});
