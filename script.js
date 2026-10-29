(() => {
  const page = document.querySelector(".page");
  const layer = document.querySelector(".decor");

  if (!page || !layer) return;

  const CELL = 24;
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

  const getPads = () => {
    const styles = getComputedStyle(page);
    return {
      x: parseFloat(styles.getPropertyValue("--pad-x")) || 20,
      y: parseFloat(styles.getPropertyValue("--pad-y")) || 20,
    };
  };

  const snap = (value, origin) =>
    origin + Math.round((value - origin) / CELL) * CELL;

  const makeBlock = (left, top, width, height) => {
    const block = document.createElement("span");
    const filled = Math.random() < 0.5;

    block.className = "block";
    block.style.left = `${left}px`;
    block.style.top = `${top}px`;
    block.style.width = `${width}px`;
    block.style.height = `${height}px`;
    block.style.borderColor = `rgba(11, 11, 11, ${
      0.07 + Math.random() * 0.08
    })`;
    block.style.background = filled
      ? `rgba(11, 11, 11, ${0.012 + Math.random() * 0.03})`
      : "transparent";

    layer.appendChild(block);
    return block;
  };

  const addAt = (clientX, clientY) => {
    const rect = page.getBoundingClientRect();
    const pads = getPads();
    const widthCells = Math.random() < 0.35
      ? randomInt(1, 4)
      : randomInt(2, 9);
    const heightCells = Math.random() < 0.5
      ? widthCells
      : randomInt(1, 7);

    const width = Math.min(widthCells * CELL, rect.width - 16);
    const height = Math.min(heightCells * CELL, rect.height - 16);
    const left = clamp(
      snap(clientX - rect.left, pads.x),
      0,
      Math.max(0, rect.width - width)
    );
    const top = clamp(
      snap(clientY - rect.top, pads.y),
      0,
      Math.max(0, rect.height - height)
    );

    makeBlock(left, top, width, height);
  };

  const seed = () => {
    const rect = page.getBoundingClientRect();
    const pads = getPads();
    const contentWidth = Math.max(CELL, rect.width - pads.x * 2);
    const contentHeight = Math.max(CELL, rect.height - pads.y * 2);
    const count = window.innerWidth < 700 ? 8 : 14;

    for (let i = 0; i < count; i += 1) {
      const widthCells = Math.random() < 0.35
        ? randomInt(1, 3)
        : randomInt(2, 9);
      const heightCells = Math.random() < 0.5
        ? widthCells
        : randomInt(1, 6);

      const width = Math.min(widthCells * CELL, contentWidth - 8);
      const height = Math.min(heightCells * CELL, contentHeight - 8);

      const left =
        pads.x +
        randomInt(
          0,
          Math.max(0, Math.floor((contentWidth - width) / CELL))
        ) *
          CELL;
      const top =
        pads.y +
        randomInt(
          0,
          Math.max(0, Math.floor((contentHeight - height) / CELL))
        ) *
          CELL;

      makeBlock(left, top, width, height);
    }
  };

  let drag = null;

  layer.addEventListener("pointerdown", (event) => {
    const block = event.target.closest(".block");
    if (!block) return;

    event.preventDefault();

    const blockRect = block.getBoundingClientRect();

    drag = {
      block,
      offsetX: event.clientX - blockRect.left,
      offsetY: event.clientY - blockRect.top,
      pointerId: event.pointerId,
    };

    block.setPointerCapture(event.pointerId);
    block.classList.add("is-dragging");
  });

  window.addEventListener("pointermove", (event) => {
    if (!drag) return;

    const rect = page.getBoundingClientRect();
    const block = drag.block;
    const left = clamp(
      event.clientX - rect.left - drag.offsetX,
      0,
      Math.max(0, rect.width - block.offsetWidth)
    );
    const top = clamp(
      event.clientY - rect.top - drag.offsetY,
      0,
      Math.max(0, rect.height - block.offsetHeight)
    );

    block.style.left = `${left}px`;
    block.style.top = `${top}px`;
  });

  const endDrag = () => {
    if (!drag) return;
    drag.block.classList.remove("is-dragging");
    drag = null;
  };

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  page.addEventListener("click", (event) => {
    if (event.target.closest(".block, a")) return;
    addAt(event.clientX, event.clientY);
  });

  window.addEventListener("resize", () => {
    const rect = page.getBoundingClientRect();
    layer.querySelectorAll(".block").forEach((block) => {
      const left = parseFloat(block.style.left) || 0;
      const top = parseFloat(block.style.top) || 0;
      block.style.left = `${Math.min(
        left,
        Math.max(0, rect.width - block.offsetWidth)
      )}px`;
      block.style.top = `${Math.min(
        top,
        Math.max(0, rect.height - block.offsetHeight)
      )}px`;
    });
  });

  seed();
})();
