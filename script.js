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
      x: parseFloat(styles.paddingLeft) || 20,
      y: parseFloat(styles.paddingTop) || 20,
    };
  };

  const snapDown = (value, origin) =>
    origin + Math.floor((value - origin) / CELL) * CELL;

  const snapNearest = (value, origin) =>
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

  const randomUnits = (max) => {
    if (max <= 1) return 1;
    const roll = Math.random();
    if (roll < 0.5) return 1;
    if (roll < 0.8) return 2;
    return randomInt(1, Math.min(max, 4));
  };

  const addAt = (clientX, clientY) => {
    const rect = page.getBoundingClientRect();
    const pads = getPads();
    const widthUnits = randomUnits(4);
    const heightUnits = Math.random() < 0.5
      ? randomUnits(4)
      : randomUnits(2);
    const width = widthUnits * CELL;
    const height = heightUnits * CELL;
    const left = clamp(
      snapDown(clientX - rect.left, pads.x),
      0,
      Math.max(0, rect.width - width)
    );
    const top = clamp(
      snapDown(clientY - rect.top, pads.y),
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
    const entry = document.querySelector(".entry");
    const entryRect = entry?.getBoundingClientRect();
    const margin = 16;

    const overlapsEntry = (left, top, width, height) =>
      Boolean(
        entryRect &&
          left < entryRect.right + margin &&
          left + width > entryRect.left - margin &&
          top < entryRect.bottom + margin &&
          top + height > entryRect.top - margin
      );

    for (let i = 0; i < count; i += 1) {
      let widthUnits;
      let heightUnits;

      if (i === 0) {
        widthUnits = 1;
        heightUnits = 1;
      } else if (i === 1) {
        widthUnits = 1;
        heightUnits = 2;
      } else if (i === 2) {
        widthUnits = 2;
        heightUnits = 1;
      } else {
        widthUnits = randomUnits(4);
        heightUnits = Math.random() < 0.45
          ? widthUnits
          : randomUnits(2);
      }

      const width = widthUnits * CELL;
      const height = heightUnits * CELL;
      const maxCol = Math.max(0, Math.floor((contentWidth - width) / CELL));
      const maxRow = Math.max(0, Math.floor((contentHeight - height) / CELL));

      for (let attempt = 0; attempt < 60; attempt += 1) {
        const left = pads.x + randomInt(0, maxCol) * CELL;
        const top = pads.y + randomInt(0, maxRow) * CELL;

        if (!overlapsEntry(left, top, width, height)) {
          makeBlock(left, top, width, height);
          break;
        }
      }
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

    const rect = page.getBoundingClientRect();
    const pads = getPads();
    const block = drag.block;
    const left = snapNearest(parseFloat(block.style.left) || 0, pads.x);
    const top = snapNearest(parseFloat(block.style.top) || 0, pads.y);

    block.style.left = `${clamp(
      left,
      0,
      Math.max(0, rect.width - block.offsetWidth)
    )}px`;
    block.style.top = `${clamp(
      top,
      0,
      Math.max(0, rect.height - block.offsetHeight)
    )}px`;
    block.classList.remove("is-dragging");
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
    const pads = getPads();

    layer.querySelectorAll(".block").forEach((block) => {
      block.style.left = `${clamp(
        parseFloat(block.style.left) || 0,
        0,
        Math.max(0, rect.width - block.offsetWidth)
      )}px`;
      block.style.top = `${clamp(
        parseFloat(block.style.top) || 0,
        0,
        Math.max(0, rect.height - block.offsetHeight)
      )}px`;
    });
  });

  document.fonts.ready.then(seed);
})();
