console.log("========== Task 5 ==========");

const BASE = "https://jsonplaceholder.typicode.com";

function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request Timeout")), ms)
  );
}

async function fetchWithTimeout(url) {
  return Promise.race([
    fetch(url),
    timeoutPromise(2000),
  ]);
}

async function dataPipeline() {
  try {
    console.log("Fetching User...");

    const userResponse = await fetchWithTimeout(
      `${BASE}/users/1`
    );

    const user = await userResponse.json();

    console.log(user);

    console.log("Fetching Posts...");

    const postsResponse = await fetchWithTimeout(
      `${BASE}/users/1/posts`
    );

    const posts = await postsResponse.json();

    console.log(posts);

    console.log("Fetching Comments...");

    const commentsResponse = await fetchWithTimeout(
      `${BASE}/posts/${posts[0].id}/comments`
    );

    const comments = await commentsResponse.json();

    console.log(comments);

    console.log({
      user,
      firstPost: posts[0],
      comments,
    });

    /*
      fetch() resolves through Promise microtasks.
      setTimeout() callback is placed into the macrotask queue.

      Promise callbacks (microtasks) execute before the next macrotask,
      which is why promise resolutions run before timer callbacks.
    */
  } catch (err) {
    if (err.message.includes("Timeout")) {
      console.error("Timeout:", err.message);
    } else if (err.message.includes("user")) {
      console.error("User error:", err.message);
    } else if (err.message.includes("posts")) {
      console.error("Posts error:", err.message);
    } else {
      console.error("Pipeline Error:", err.message);
    }
  }
}

dataPipeline();