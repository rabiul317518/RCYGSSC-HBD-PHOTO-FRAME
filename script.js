const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const frame = new Image();
frame.src = 'frame.png'; // এখানে রাখবে তোমার রেড ক্রিসেন্ট HBD ফ্রেম PNG

upload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Canvas সেট করা
      canvas.width = img.width > 800 ? 800 : img.width;
      const scale = canvas.width / img.width;
      canvas.height = img.height * scale;

      // ছবি আঁকা
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // ফ্রেম overlay
      ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'RCYGSSC-HBD.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
