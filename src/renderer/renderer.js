const { ipcRenderer } = require("electron");

document.querySelectorAll(".tabs .tab").forEach((navt, index) => {
  navt.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".tabs .tab").forEach((navtr) => {
      navtr.classList.remove("active");
    });

    document.querySelectorAll(".app").forEach((boxcr) => {
      boxcr.classList.remove("active");
    });

    navt.classList.add("active");

    document.querySelectorAll(".app")[index].classList.add("active");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const activeApp = document.querySelector(".app.active");

    if (activeApp) {
      const activeCreate = activeApp.querySelector("#create_button");
      const activeCalc = activeApp.querySelector("#calc_button");

      if (activeCreate && !activeCreate.classList.contains("hidden")) {
        activeCreate.click();
      } else if (activeCalc && !activeCalc.classList.contains("hidden")) {
        activeCalc.click();
      }
    }
  }
});

document
  .getElementById("browser_directory_button")
  .addEventListener("click", async () => {
    const directory = await ipcRenderer.invoke("selectDirectory");
    if (directory) {
      document.getElementById("directory_input").value = directory;
    }
  });

document
  .getElementById("home_directory_button")
  .addEventListener("click", async () => {
    const directory = await ipcRenderer.invoke("selectDirectory");
    if (directory) {
      document.getElementById("directory_input").value = directory;
    }
  });

document.getElementById("btn-edit").addEventListener("click", async () => {
  var input = document.getElementById("input_name_dir");
  if (input.readOnly) {
    input.readOnly = false;
    input.focus();
    input.disabled = false;
  } else {
    input.readOnly = true;
    input.disabled = true;
  }
});

document.getElementById("create_button").addEventListener("click", async () => {
  const directory = document.getElementById("directory_input").value;
  const projectName = document.getElementById("input_name_dir").value;

  if (!projectName) {
    alert("Digite um nome para a pasta.");
    return;
  }

  if (!directory) {
    alert("Escolha um diretório de destino.");
    return;
  }

  const validDirectoryName = /^[a-zA-Z0-9\s]+$/;
  if (!validDirectoryName.test(projectName)) {
    alert("Digite um nome depasta válido.");
    return;
  }

  const response = await ipcRenderer.invoke(
    "createDirectory",
    directory,
    projectName
  );
  if (response.success) {
    alert(response.message);
    window.close();
  } else {
    alert(response.message);
  }
});

document.getElementById("calc_button").addEventListener("click", async () => {
  const DT = document.getElementById("workDays").value;
  const VH = document.getElementById("hoursValue").value;
  const HM = document.getElementById("averageHours").value;
  const CAC = document.getElementById("cac").value;

  if (DT === "" || VH === "" || HM === "" || CAC === "") {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  var TH = DT * HM;
  var VP = TH * VH;
  var VI = (VP * 0.18).toFixed(2);
  var VS = parseFloat(VP) + parseFloat(VI) + parseFloat(CAC);
  var desconto = VS * 0.12;
  var DSP = VS - desconto;

  var vpBRL = Number(VP).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  var viBRL = Number(VI).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  var vsBRL = VS.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  var dspBRL = DSP.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  document.getElementById("taxValue").textContent = viBRL;
  document.getElementById("amountHours").textContent = TH;
  document.getElementById("dsp").textContent = dspBRL;
  document.getElementById("pv").textContent = vpBRL;
  document.getElementById("sv").textContent = vsBRL;
});
