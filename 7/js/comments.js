const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentsLoadButton = document.querySelector('.comments-loader');
const displayedCommentsAmount = document.querySelector('.social__comment-count');

const renderCommentsItem = (commentsItem) => {
  const comment = commentTemplate.cloneNode(true);
  const commentPicture = comment.querySelector('.social__picture');
  const commentText = comment.querySelector('.social__text');

  commentPicture.src = commentsItem.avatar;
  commentPicture.alt = commentsItem.name;
  commentText.textContent = commentsItem.message;

  return comment;
};

const renderComments = (comments, amount) => {
  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(comments.length, amount);
  displayedCommentsAmount.innerHTML = `${endIndex} из <span class="comments-count">${comments.length}</span> комментариев`;

  commentsLoadButton.classList.remove('hidden');
  if (endIndex >= comments.length) {
    commentsLoadButton.classList.add('hidden');
  }

  for (let i = 0; i < endIndex; i++) {
    fragment.appendChild(renderCommentsItem(comments[i]));
  }

  commentsContainer.appendChild(fragment);
};

const resetComments = () => {
  commentsContainer.innerHTML = '';
};

export {renderComments, resetComments};
