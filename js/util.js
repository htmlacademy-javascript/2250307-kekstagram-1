const MESSAGE_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = '100';
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = '0';
  messageContainer.style.right = '0';
  messageContainer.style.top = '0';
  messageContainer.style.padding = '15px';
  messageContainer.style.backgroundColor = '#ff4d4d';
  messageContainer.style.fontSize = '15px';
  messageContainer.style.textAlign = 'center';

  messageContainer.textContent = message;
  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};

export {isEscapeKey, showErrorMessage};
