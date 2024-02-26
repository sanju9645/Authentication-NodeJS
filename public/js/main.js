
const closeToast = (toastId) => {
  const toastComponent = document.getElementById(toastId);
  const toastBodyDiv = document.getElementById(toastId+"-body");

  if (toastBodyDiv) {
    toastBodyDiv.textContent = ''; 
  }

  if (toastComponent) {
    toastComponent.classList.add('hidden');
  }
}

const displayToast = (toastId, toastBody) => {
  const toastComponent = document.getElementById(toastId);
  const toastBodyDiv = document.getElementById(toastId+"-body");

  if (toastBodyDiv) {
    toastBodyDiv.textContent = toastBody;
  }

  if (toastComponent) {
    toastComponent.classList.remove('hidden');
  }
}
