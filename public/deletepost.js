async function deleteFormHandler(event) {
  event.preventDefault();

  const urlParts = window.location.toString().split('/');
const post_id = urlParts[urlParts.length - 1];

const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE'
  });  

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);