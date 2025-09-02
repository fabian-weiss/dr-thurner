// utils/swipeToPage.ts
export function swipeToPage(index: number, containerId = "swipe-shell") {
  const parent = document.getElementById(containerId);
  if (!parent) return;
  const target = parent.querySelector(`[data-page="${index}"]`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
