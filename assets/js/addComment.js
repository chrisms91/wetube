import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const removeCommentBtn = document.querySelector('.jsRemoveCommentBtn');

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const deceaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment, id) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const span = document.createElement('span');
  const btnSpan = document.createElement('span');
  btnSpan.innerHTML = '❌';
  btnSpan.classList.add('jsRemoveCommentBtn');
  btnSpan.setAttribute('data-id', id);
  btnSpan.addEventListener('click', handleRemoveComment);
  span.innerHTML = comment;
  div.appendChild(span);
  div.appendChild(btnSpan);
  li.appendChild(div);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment,
    },
  }).then((res) => {
    if (res.status === 200) {
      const {
        data: { commentId },
      } = res;
      console.log(commentId);
      addComment(comment, commentId);
    }
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
};

const removeComment = (target) => {
  const parentLi = target.parentNode.parentNode;
  const parentUl = parentLi.parentNode;
  parentUl.removeChild(parentLi);
  deceaseNumber();
};

const handleRemoveComment = (event) => {
  const videoId = window.location.href.split('/videos/')[1];
  const commentId = event.target.getAttribute('data-id');

  axios({
    url: `/api/${videoId}/${commentId}`,
    method: 'DELETE',
  }).then((res) => {
    if (res.status === 200) {
      removeComment(event.target);
    }
  });
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
  if (removeCommentBtn) {
    removeCommentBtn.addEventListener('click', handleRemoveComment);
  }
}

if (addCommentForm) {
  init();
}
