// List to hold the threads data
let threads = [];

// Function to render the threads
function renderThreads() {
  const threadList = document.getElementById('threadList');
  threadList.innerHTML = ''; // Clear previous content

  threads.forEach((thread, index) => {
    const threadCard = document.createElement('div');
    threadCard.classList.add('card');

    threadCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${thread.title}</h5>
        <p class="card-text">${thread.description}</p>
        <div>
          <button class="btn btn-success" onclick="voteThread(${index}, 'upvote')">Upvote</button>
          <button class="btn btn-danger" onclick="voteThread(${index}, 'downvote')">Downvote</button>
          <span>Upvotes: <span id="upvoteCount-${index}">${thread.upvotes}</span> | Downvotes: <span id="downvoteCount-${index}">${thread.downvotes}</span></span>
        </div>
        <h6 class="mt-3">Comments</h6>
        <div id="commentSection-${index}">
          <!-- Comments will be rendered here -->
        </div>
        <div>
          <input type="text" id="commentInput-${index}" class="form-control" placeholder="Add a comment" />
          <button class="btn btn-primary mt-2" onclick="addComment(${index})">Add Comment</button>
        </div>
      </div>
    `;

    threadList.appendChild(threadCard);
  });
}

// Function to add a new thread
function addThread(title, description) {
  const newThread = {
    title,
    description,
    upvotes: 0,
    downvotes: 0,
    comments: []
  };

  threads.push(newThread);
  renderThreads(); // Re-render after adding a thread
}

// Function to handle the voting on a thread
function voteThread(index, voteType) {
  if (voteType === 'upvote') {
    threads[index].upvotes++;
  } else if (voteType === 'downvote') {
    threads[index].downvotes++;
  }

  document.getElementById(`upvoteCount-${index}`).textContent = threads[index].upvotes;
  document.getElementById(`downvoteCount-${index}`).textContent = threads[index].downvotes;
}

// Function to add a comment to a thread
function addComment(index) {
  const commentInput = document.getElementById(`commentInput-${index}`);
  const commentText = commentInput.value.trim();

  if (commentText) {
    threads[index].comments.push(commentText);
    commentInput.value = ''; // Clear the input field
    renderComments(index); // Re-render comments
  }
}

// Function to render comments for a thread
function renderComments(index) {
  const commentSection = document.getElementById(`commentSection-${index}`);
  commentSection.innerHTML = ''; // Clear previous comments

  threads[index].comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('border', 'p-2', 'mb-2');
    commentDiv.textContent = comment;

    commentSection.appendChild(commentDiv);
  });
}

// Event listener for the thread creation form
document.getElementById('createThreadForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('threadTitle').value;
  const description = document.getElementById('threadDescription').value;

  addThread(title, description);

  // Clear the form after submission
  document.getElementById('threadTitle').value = '';
  document.getElementById('threadDescription').value = '';
});

// Initial call to render the threads (if any exist on load)
renderThreads();
