const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const NONE_EFFECT = EFFECTS[0];

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsRadiosContainer = document.querySelector('.effects');
const effectsRadios = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

let currentEffect = NONE_EFFECT;

const resetEffects = () => {
  effectsRadios[0].checked = true;
  sliderContainer.classList.add('hidden');
  imagePreview.className = '';
  imagePreview.style.filter = 'none';
};

noUiSlider.create(slider, {
  range: {
    min: NONE_EFFECT.min,
    max: NONE_EFFECT.max,
  },
  start: NONE_EFFECT.max,
  step: NONE_EFFECT.step,
  connect: 'lower'
});

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
};

const onEffectsRadiosContainerChange = (evt) => {
  const effectClass = evt.target.id.split('-').pop();
  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${effectClass}`);

  currentEffect = EFFECTS.find((effect) => effect.name === effectClass);

  updateSlider();

  sliderContainer.classList.remove('hidden');
  if (currentEffect.name === 'none') {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
  }
};

const onSliderUpdate = () => {
  const effectLevel = slider.noUiSlider.get();
  effectLevelInput.value = effectLevel;
  imagePreview.style.filter = `${currentEffect.style}(${effectLevel}${currentEffect.unit})`;
};

effectsRadiosContainer.addEventListener('change', onEffectsRadiosContainerChange);
slider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
