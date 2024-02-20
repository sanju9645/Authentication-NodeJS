
const closeToast = (toastId) => {
  const toastComponent = document.getElementById(toastId);
  const toastBodyDiv = document.getElementById(toastId+"-body");
  toastBodyDiv.textContent = ''; 
  toastComponent.classList.add('hidden');
}

const displayToast = (toastId, toastBody) => {
  const toastComponent = document.getElementById(toastId);
  const toastBodyDiv = document.getElementById(toastId+"-body");
  toastBodyDiv.textContent = toastBody; 
  toastComponent.classList.remove('hidden');
}
