const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

function showComments(photo) {
  const fragment = document.createDocumentFragment();
  commentsContainer.innerHTML = '';

  photo.comments.forEach(({avatar, username, message}) => {
    const comment = commentTemplate.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentPicture.src = avatar;
    commentPicture.alt = username;
    commentText.textContent = message;

    fragment.appendChild(comment);
  });

  commentsContainer.appendChild(fragment);
}

export {showComments};
