const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

let renderedCommentsAmount = 0;
const canRenderOnce = 1;
const commentsLoadButton = document.querySelector('.comments-loader');

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  commentsContainer.innerHTML = '';

  renderedCommentsAmount += canRenderOnce;

  if (renderedCommentsAmount >= comments.length) {
    commentsLoadButton.classList.add('hidden');
    renderedCommentsAmount = comments.length;
    console.log(renderedCommentsAmount);
  }
  else {
    commentsLoadButton.classList.remove('hidden');
    console.log(renderedCommentsAmount);
  }

  for (let i = 0; i < renderedCommentsAmount; i++) {
    const comment = commentTemplate.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentPicture.src = comments[i].avatar;
    commentPicture.alt = comments[i].name;
    commentText.textContent = comments[i].message;

    fragment.appendChild(comment);
  }

  commentsContainer.appendChild(fragment);
};

const resetRenderedCommentsAmount = () => renderedCommentsAmount * 0;

export {renderComments, resetRenderedCommentsAmount};
