/**
 * exporter.js — Canvas-based PNG export (B&W for thermal printing).
 * Supports standard (384px) and 53mm (626px) export widths.
 */

const Exporter = (() => {
  /**
   * Export current chibi as B&W PNG.
   * @param {Object} selection - current part selection
   * @param {Array} overlayItems - placed decorations/text from Overlay
   * @param {number} width - output width in pixels
   */
  function exportPNG(selection, overlayItems, width = 384) {
    // Build SVG with chibi + decorations (text rendered via canvas for font reliability)
    const decoSVG = buildDecoSVG(overlayItems);
    const svgString = Renderer.toSVGString(selection, decoSVG);

    // Calculate height from aspect ratio (2:3)
    const height = Math.round(width * 1.5);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Create image from SVG
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      // Draw text items via canvas API (fonts loaded in page are available)
      const scaleX = width / 200;
      const scaleY = height / 300;

      for (const item of (overlayItems || [])) {
        if (item.type !== 'text') continue;
        const fs = Math.round(item.fontSize * item.scale * scaleX);
        ctx.font = `${fs}px "${item.font}", sans-serif`;
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.text, item.x * scaleX, item.y * scaleY);
      }

      // Convert to B&W with threshold
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const bw = avg > 128 ? 255 : 0;
        data[i] = bw;
        data[i + 1] = bw;
        data[i + 2] = bw;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);

      // Download
      canvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `chibi-${width}px.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert('Erreur lors de l\'export. Veuillez réessayer.');
    };

    img.src = url;
  }

  /**
   * Build SVG content for decoration items only (text handled by canvas).
   */
  function buildDecoSVG(overlayItems) {
    if (!overlayItems || overlayItems.length === 0) return '';
    let svg = '';
    for (const item of overlayItems) {
      if (item.type === 'deco') {
        const deco = DECORATIONS.find(d => d.id === item.decoId);
        if (!deco) continue;
        svg += `<g transform="translate(${item.x},${item.y}) scale(${item.scale})">${deco.svg}</g>`;
      }
    }
    return svg;
  }

  return { exportPNG };
})();

window.Exporter = Exporter;
