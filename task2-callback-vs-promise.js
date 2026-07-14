console.log("Task 2");

const startTime = Date.now();

// Callback Hell

function getUserId(callback) {
    setTimeout(() => {
        console.log("User Id fetched");
        callback(1);
    },300);
}

function getPosts(userId , callback) {
    setTimeout(() => {
        console.log("Posts fetched");
        callback(["Post 1" , "Post 2" , "Post 3"]);
    },200);
}

function getComments(post , callback) {
    setTimeout(() => {
        console.log("Comments fetched");
        callback(["Comment 1" , "Comment 2" , "Comment 3"]);
    })
}

console.log("\n Callback Hell");

getUserId((userId) => {
    getPosts(userId , (posts) => {
        getComments(posts[0] , (comments) => {
            console.log({
                userId ,
                posts , 
                comments ,
            });

            console.log(`Time taken : ${Date.now() - startTime} ms`);

            console.log("This is why callback hell is hard to debug!");

            promiseVersion();
        })
    })
})

// Promise Version

function getUserPromise() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(1),300);
    });
}

function getPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Post 1" , "Post 2" , "Post3"]),300);
    })
}

function getCommentsPromise(post) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Comment 1" , "Comment 2" , "Comment 3"]),150);
    })
}

function promiseVersion() {
  console.log("\n--- Promise Chain ---");

  const promiseStart = Date.now();

  getUserPromise()
    .then((userId) => {
      console.log("User ID fetched");
      return getPostsPromise(userId);
    })
    .then((posts) => {
      console.log("Posts fetched");
      return getCommentsPromise(posts[0]).then((comments) => ({
        posts,
        comments,
      }));
    })
    .then((data) => {
      console.log(data);

      console.log(
        `Total Time: ${Date.now() - promiseStart} ms`
      );
    })
    .catch(console.error);
}