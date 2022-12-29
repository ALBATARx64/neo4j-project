const neo4jCalls = require("./post.services");
const router = require("express").Router();
const { protect } = require("../../middlewares/authMiddleware");

let string;

router.post("/createPost", protect, async (req, res) => {
  let { subject, text } = req.body;
  let email = res.user.email;
  if (!subject || !text) {
    console.log(`Field must not be empety`);
    res.json({
      success: 0,
      message: "Post could not be created",
    });
  } else {
    try {
      string = await neo4jCalls.createPost(email, subject, text);
      if (string) {
        res.json({
          success: 1,
          message: "Post created successufly",
        });
      } else {
        res.json({
          success: 0,
          message: "Post could not be created",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// router.get("/deletePost/:id", async (req, res) => {
//   let temp = req.params;
//   res.render("deletePost", { id: temp.id });
// });

router.delete("/deletePost/:id", protect, async (req, res) => {
  let Id = req.params.id;

  let userEmail = await neo4jCalls.getPost(Id);

  if (userEmail.records[0] == undefined) {
    res.json({
      success: 0,
      message: "Post does not exists",
    });
  } else {
    userEmail = userEmail.records[0]._fields[0].emailUser;
    if (userEmail !== res.user.email) {
      res.json({
        success: 0,
        message: "You can not delete this post it is not yours ",
      });
    } else {
      try {
        let t = await neo4jCalls.deletePost(Id);
        if (t) {
          res.json({
            success: 1,
            message: "Post deleted successfuly",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //res.redirect("/posts");
});

router.get("/:id", protect, async (req, res) => {
  let temp = req.params.id;
  console.log(`Id is ${temp}`);
  let e = await neo4jCalls.getPost(temp);

  if (e.records[0] == undefined) {
    res.json({
      success: 0,
      message: "Post does not exists",
    });
  } else {
    if (e) {
      res.json({
        success: 1,
        message: "Got it successufuly",
        data: e.records[0]._fields[0],
      });
    }
  }

  //res.render("getPost", { e });
});

// router.get("/updatePost/:id", async (req, res) => {
//   let id = req.params.id;
//   let e = await neo4jCalls.getPost(id);
//   res.render("updatePost", { id, e });
// });

router.put("/updatePost/:id", protect, async (req, res) => {
  let id = req.params.id;
  let { subject, post } = req.body;

  let userPost = await neo4jCalls.getPost(id);

  if (userPost.records[0] == undefined) {
    res.json({
      success: 0,
      message: "Post does not exists",
    });
  } else {
    userEmail = userPost.records[0]._fields[0].emailUser;
    if (userEmail !== res.user.email) {
      res.json({
        success: 0,
        message: "You can not update this post it is not yours ",
      });
    } else {
      if (!post) {
        post = userPost.records[0]._fields[0].text;
      } else if (!subject) {
        subject = userPost.records[0]._fields[0].subject;
      }
      const result = await neo4jCalls.updatePost(id, subject, post);

      if (result) {
        res.json({
          success: 1,
          message: "Post updated successfuly",
        });
      }
    }
  }

  //res.redirect("/posts");
});

[[], 0];

router.post("/:id", protect, async (req, res) => {
  let id = req.params.id;
  let email = res.user.email;
  let likes = await neo4jCalls.getLikesOfPost(id);
  let post = await neo4jCalls.getPost(id);
  if (likes.records[0] == undefined) {
    res.json({
      success: 0,
      message: "Post does not exists",
    });
  } else {
    let L = likes.records[0]._fields[0];
    let numbL = post.records[0]._fields[0].likes;
    let k;
    console.log("Likes " + L.users);
    if (L.users.includes(res.user.email)) {
      let e = email;
      k = L.users;
      k = k.replace(`${res.user.email},`, "");
      numbL = parseInt(numbL) - 1;
      let likedPosts = await neo4jCalls.getUserLikes(email);
      let lPosts = likedPosts.records[0]._fields[0];
      lPosts = lPosts.replace(`${id},`, "");
      let u = await neo4jCalls.updateUserLikes(id, email, lPosts);
    } else {
      k = L.users.concat(`${res.user.email},`);
      numbL = parseInt(numbL) + 1;
      let likedPosts = await neo4jCalls.getUserLikes(email);
      let lPosts = likedPosts.records[0]._fields[0];
      lPosts = lPosts.concat(`${id},`);
      let j = await neo4jCalls.updateUserLikes(id, email, lPosts);
    }

    const result = await neo4jCalls.likePost(id, numbL, k);

    if (result) {
      res.json({
        success: 1,
        message: "Liked Post succussefuly",
        data: result.records[0]._fields,
      });
    }
  }
});

router.get("/", protect, async (req, res) => {
  let email = res.user.email;
  let result = await neo4jCalls.getSuggestionsPosts1(email);
  let tempSubjects = result.records;
  let Subjects = [];
  // let likesP = await neo4jCalls.getUserLikes(email);
  // likesP = likesP.records[0]._fields[0];
  // let p = likesP.split(",");
  // console.log("Array " + p[1]);
  let results;
  results = await neo4jCalls.getUserIntersts(email);
  let intersets = results.records[0]._fields[0];
  intersets = intersets.split(",");
  console.log(intersets);
  //Subject has more than word

  for (let r = 0; r < intersets.length; r++) {
    if (!Subjects.includes(intersets[r])) {
      Subjects.push(intersets[r]);
    }
  }
  let arr;
  let tempArr;
  for (let i = 0; i < tempSubjects.length; i++) {
    tempArr = tempSubjects[i]._fields[0];
    arr = tempArr.split(",");
    for (let y = 0; y < arr.length; y++) {
      if (!Subjects.includes(arr[y])) {
        Subjects.push(arr[y]);
      }
      Subjects.push(arr[y]);
    }
  }

  // for (let i = 1; i < p.length; i++) {
  //   if (p[i] !== "") {
  //     let e = await neo4jCalls.getPost(p[i]);
  //     console.log(e);
  //     let temp = e.records[0]._fields[0];
  //     if (!Subjects.includes(temp.subject)) {
  //       Subjects.push(temp.subject);
  //     }
  //   }
  // }

  let Posts = [];
  let uniqueSubjects = [...new Set(Subjects)];
  console.log("Uniq Subjects");
  console.log(uniqueSubjects);

  for (let i = 0; i < uniqueSubjects.length; i++) {
    let r = await neo4jCalls.getSuggestionsPosts2(uniqueSubjects[i], email);
    let p = r.records;
    for (let j = 0; j < p.length; j++) {
      Posts.push(p[j]._fields[0]);
    }
  }

  const unique = [...new Map(Posts.map((m) => [m.date, m])).values()];
  console.log(unique);

  let last;
  last = unique;
  if (Posts.length === 0 || last.length < 3) {
    console.log("No Posts " + Posts.length);
    Posts = await neo4jCalls.getAllPosts();
    last = [];
    for (let i = 0; i < Posts.records.length; i++) {
      Posts.records[i] = Posts.records[i]._fields;
      last.push(Posts.records[i]);
    }
  }

  res.json({
    success: 1,
    post: last,
  });
});

module.exports = router;
