async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    console.log('Post created:', responseData);
  } catch (error) {
    console.error('Error creating post:', response.statusText);
  }
  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);