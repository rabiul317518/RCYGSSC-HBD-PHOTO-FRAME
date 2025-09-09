async function generateFrame() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const photoFile = document.getElementById('photo').files[0];

  if (!name || !dob || !photoFile) {
    alert("Please fill all fields and upload a photo!");
    return;
  }

  // Load user's photo
  const photoURL = URL.createObjectURL(photoFile);
  const photo = await loadImage(photoURL);

  // Draw photo as background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);

  // Load frame overlay
  const frame = await loadImage('frames/birthday-frame.png');
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

  // Add text (name + DOB)
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(name, 50, 550);
  ctx.fillText(dob, 400, 550);

  // Make downloadable
  document.getElementById('download').href = canvas.toDataURL();
}

// Helper to load images
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}
