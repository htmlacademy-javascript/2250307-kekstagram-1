const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  commentsContainer.innerHTML = '';

  comments.forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentPicture.src = element.avatar;
    commentPicture.alt = element.name;
    commentText.textContent = element.message;

    fragment.appendChild(comment);
  });

  commentsContainer.appendChild(fragment);
};

export {renderComments};
