/**
 * exporter.js — Canvas-based PNG export (B&W for thermal printing).
 */

const Exporter = (() => {
  /**
   * Export current chibi as B&W PNG.
   * @param {Object} selection - current part selection
   * @param {number} width - output width in pixels (default 384 for Phomemo M02S)
   */
  function exportPNG(selection, width = 384) {
    const svgString = Renderer.toSVGString(selection);

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
        a.download = 'chibi.png';
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

  return { exportPNG };
})();

window.Exporter = Exporter;
