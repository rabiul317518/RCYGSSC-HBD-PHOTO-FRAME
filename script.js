const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const frame = new Image();
frame.src = 'images/frame.png';

let uploadedImg = null;
let imgX = 0, imgY = 0, imgScale = 1;
let imgWidth, imgHeight;
let isDragging = false;
let startX, startY;

// ছবি আপলোড
upload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      uploadedImg = img;
      imgWidth = img.width;
      imgHeight = img.height;
      imgX = 0;
      imgY = 0;
      imgScale = 1;

      canvas.width = img.width > 800 ? 800 : img.width;
      const scale = canvas.width / img.width;
      canvas.height = img.height * scale;

      drawImage();
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

// ছবি ড্র করা
function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!uploadedImg) return;
  ctx.drawImage(uploadedImg, imgX, imgY, imgWidth * imgScale, imgHeight * imgScale);
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

// Drag এবং Pan
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.offsetX - imgX;
  startY = e.offsetY - imgY;
});
canvas.addEventListener('mouseup', () => isDragging = false);
canvas.addEventListener('mouseleave', () => isDragging = false);
canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  imgX = e.offsetX - startX;
  imgY = e.offsetY - startY;
  drawImage();
});

// Mouse wheel Zoom
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoom = e.deltaY < 0 ? 1.05 : 0.95;
  imgScale *= zoom;
  drawImage();
});

// Download
downloadBtn.addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'RCYGSSC-HBD.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
