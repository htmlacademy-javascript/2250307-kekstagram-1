const SCALE_STEP = 25;

const imagePreview = document.querySelector('.img-upload__preview');
const imagePreviewContent = imagePreview.querySelector('img');
const scaleButtonSmall = document.querySelector('.scale__control--smaller');
const scaleButtonBig = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const ScaleRange = {
  MIN: 25,
  MAX: 100
};

const resetScale = () => {
  scaleInput.value = '100%';
  imagePreviewContent.style.scale = 1;
};

const changeScale = (scaleNumber) => {
  scaleInput.value = `${scaleNumber}%`;
  imagePreviewContent.style.scale = scaleNumber / 100;
};

const onScaleButtonSmallClick = () => {
  const scaleNumber = Number(scaleInput.value.slice(0, -1)) - SCALE_STEP;
  if (scaleNumber >= ScaleRange.MIN) {
    changeScale(scaleNumber);
  }
};

const onScaleButtonBigClick = () => {
  const scaleNumber = Number(scaleInput.value.slice(0, -1)) + SCALE_STEP;
  if (scaleNumber <= ScaleRange.MAX) {
    changeScale(scaleNumber);
  }
};

scaleButtonSmall.addEventListener('click', onScaleButtonSmallClick);
scaleButtonBig.addEventListener('click', onScaleButtonBigClick);

export {resetScale};
