document.addEventListener("DOMContentLoaded", () => {
  // Chọn tất cả các bộ đếm (counter)
  const counter = document.querySelector(".inner-quantity");
  const minusButton1 = counter.querySelector(".minus1");
  const plusButton1 = counter.querySelector(".plus1");
  const minusButton2 = counter.querySelector(".minus2");
  const plusButton2 = counter.querySelector(".plus2");
  const numberDisplay1 = counter.querySelector(".inner-number1");
  const numberDisplay2 = counter.querySelector(".inner-number2");
  const totalDisplay = counter
    .closest(".inner-content")
    .querySelector("h5 span"); 
  const pricePerUnit = 1000;

  let quantity2 = parseInt(numberDisplay2.textContent, 10); 
  let quantity1 = parseInt(numberDisplay1.textContent, 10);

  function updateTotal() {
    const total = (quantity1 + quantity2 * 50) * pricePerUnit;
    totalDisplay.textContent = `${total.toLocaleString()}đ`;
  }

  minusButton1.addEventListener("click", () => {
    console.log("Clicked button");
    if (quantity1 > 0) {
      quantity1 -= 1;
      numberDisplay1.textContent = quantity1;
      updateTotal(); 
    }
  });

  plusButton1.addEventListener("click", () => {
    quantity1 += 1;
    numberDisplay1.textContent = quantity1;
    updateTotal(); 
  });

  minusButton2.addEventListener("click", () => {
    console.log("Clicked button");
    if (quantity2 > 0) {
      quantity2 -= 1;
      numberDisplay2.textContent = quantity2;
      updateTotal(); 
    }
  });

  plusButton2.addEventListener("click", () => {
    quantity2 += 1;
    numberDisplay2.textContent = quantity2;
    updateTotal(); 
  });

  const counter2 = document.querySelector(".inner-below");
  const confirmButton = counter2.querySelector(".confirm-button");

  confirmButton.addEventListener("click", () => {
    const agreeTerms = document.getElementById("agree").checked;

    let selectedPayment = null;
    if (document.getElementById("momo").checked) {
      selectedPayment = "MOMO"; 
    } else if (document.getElementById("vnpay").checked) {
      selectedPayment = "VNPAY";
    } else if (document.getElementById("bkpay").checked) {
      selectedPayment = "BKPAY";
    }

    if (!selectedPayment) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    if (!agreeTerms) {
      alert("Vui lòng đồng ý với Điều khoản & Điều kiện!");
      return;
    }

    // Tạo object dữ liệu để gửi
    const requestData = {
      num1: quantity1,
      num2: quantity2,
      payment_method: selectedPayment,
      agree_terms: agreeTerms,
      total_price: (quantity1 + quantity2 * 50) * pricePerUnit,
      totalpage: quantity1 + quantity2 * 50,
    };

    const queryParams = new URLSearchParams(requestData).toString();
    window.location.href = "/checkout/buy-paper/?" + queryParams;
  });
});
