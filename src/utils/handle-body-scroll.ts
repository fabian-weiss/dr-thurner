export const handleBodyScroll = (allowScroll: boolean) => {
  if (!allowScroll) {
    document.body.classList.add("fw-dialog-open");
    document.querySelector("html")?.classList.add("fw-dialog-open");
  } else {
    document.body.classList.remove("fw-dialog-open");
    document.querySelector("html")?.classList.remove("fw-dialog-open");
  }
};
