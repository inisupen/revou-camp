// Ambil elemen layar
const screen = document.querySelector(".screen");

// Variabel untuk menyimpan operasi
let operand1 = ""; // Angka pertama
let operand2 = ""; // Angka kedua
let operator = ""; // Operator saat ini
let resetScreen = false; // Indikasi reset layar setelah hasil

// Fungsi untuk memperbarui layar
function updateScreen(value) {
  screen.value = value;
}

// Fungsi untuk menghitung
function calculate() {
  let result;
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error"; // Cegah pembagian nol
      break;
    default:
      return;
  }

  // Format hasil dengan pemisah ribuan
  return formatNumber(result);
}

// Fungsi untuk menambahkan pemisah ribuan
function formatNumber(number) {
  return number.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

// Event listener untuk tombol
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("btn-ac")) {
      // Reset semua
      operand1 = "";
      operand2 = "";
      operator = "";
      resetScreen = false;
      updateScreen("");
    } else if (button.classList.contains("btn-c")) {
      // Hapus karakter terakhir
      if (!resetScreen) {
        screen.value = screen.value.slice(0, -1);
        if (!operator) {
          operand1 = screen.value;
        } else {
          operand2 = screen.value;
        }
      }
    } else if (button.classList.contains("btn-operator")) {
      // Operator ditekan
      if (operand1 && !operator) {
        operator = value;
        resetScreen = true;
      }
    } else if (button.classList.contains("btn-equal")) {
      // Kalkulasi hasil
      if (operand1 && operator && operand2) {
        const result = calculate();
        updateScreen(result);
        operand1 = result.replace(/,/g, ""); // Hapus format untuk kalkulasi berikutnya
        operand2 = "";
        operator = "";
        resetScreen = true;
      }
    } else if (value === ".") {
        // Tombol koma ditekan
        if (!screen.value.includes(".")) {
          if (resetScreen || screen.value === "") {
            updateScreen("0."); // Tambahkan "0." jika layar kosong
            resetScreen = false;
          } else {
            updateScreen(screen.value + "."); // Tambahkan koma ke layar
          }
        }
      
        // Perbarui operand
        if (!operator) {
          operand1 = screen.value;
        } else {
          operand2 = screen.value;
        }
      
    } else {
      // Input angka
      if (resetScreen) {
        updateScreen(value);
        resetScreen = false;
      } else {
        updateScreen(screen.value + value);
      }

      // Simpan operand
      if (!operator) {
        operand1 = screen.value;
      } else {
        operand2 = screen.value;
      }
    }
  });
});
