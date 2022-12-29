const { getDriver } = require("../../neo4j");
const driver = getDriver();
let session = driver.session();

// Create a session to run Cypher statements in.

// Run a Cypher statement, reading the result in a streaming manner as records arrive:

exports.getAllPosts = async function () {
  const postNode = await session.executeWrite((tx) => {
    return tx.run(
      `
      match (n:POST) set n.id = id(n) return properties(n)
          `,
      {}
    );
  });

  return postNode;
};

exports.createPost = async function (email, subject, text) {
  let likes = ",";
  let date = new Date();
  const postNode = await session.executeWrite((tx) => {
    return tx.run(
      `
      MATCH (u:User {email :'${email}' })
create (u) -[:HAS_POST] ->(p:POST {subject:'${subject}', text:"${text}", emailUser:"${email}", likes: 0 , date:"${date}"}) -[:HAS_LIKES] ->(l:LIKES {users:"${likes}" })
            `,
      {
        email,
        subject,
        text,
        date,
      }
    );
  });
  return postNode;
};

exports.deletePost = async function (id) {
  let query = `match (p:POST) -[:HAS_LIKES]->(l:LIKES)
  where id(p) = ${id} 
  detach delete p, l`;

  let string = await session.run(query, {}).catch((err) => {
    console.log(err);
  });

  console.log("String ", string);
  return string;
};

exports.getPost = async function (id) {
  let query = `match (n:POST) where id(n) = ${id} return properties(n)`;
  const postNode = await session.executeRead((tx) => {
    return tx.run(query, { id });
  });

  return postNode;
};

exports.updatePost = async function (id, subject, post) {
  let query = `match (n:POST)
  where id(n) = ${id}
  set n.subject = "${subject}" , n.text = "${post}"
  `;
  const postNode = await session.executeWrite((tx) => {
    return tx.run(query, {});
  });

  return postNode;
};

exports.likePost = async function (id, numbL, L) {
  let query = `match (n:POST) - [con:HAS_LIKES] -> (l:LIKES) where id(n) = ${id} set n.likes = ${numbL} set l.users = '${L}' return properties(l)`;
  const postNode = await session.executeWrite((tx) => {
    return tx.run(query, {});
  });

  return postNode;
};

exports.getUserLikes = async function (email) {
  let query = `match (n:User {email:"${email}"}) return n.likedPosts as likedPosts`;
  const userLikesNode = await session.executeRead((tx) => {
    return tx.run(query, {});
  });
  return userLikesNode;
};

exports.updateUserLikes = async function (id, email, likes) {
  let query = `match (n:User {email:"${email}"}) set n.likedPosts = "${likes}"`;
  const postNode = await session.executeWrite((tx) => {
    return tx.run(query, {});
  });
  return postNode;
};

exports.getLikesOfPost = async function (id) {
  let query = `
  MATCH (p:POST) - [con:HAS_LIKES] -> (l:LIKES)
  where id(p) = ${id}
  return properties(l) `;

  const likesNode = await session.executeWrite((tx) => {
    return tx.run(query, {});
  });

  return likesNode;
};

exports.getSuggestionsPosts1 = async function (email) {
  let query1 = `match (n:User {email: "${email}"})-[:HAS_POST]->(p:POST) return DISTINCT p.subject as subject`;
  const SuggestedNode = await session.executeWrite((tx) => {
    return tx.run(query1, {});
  });
  return SuggestedNode;
};

exports.getSuggestionsPosts2 = async function (subject, email) {
  let query2 = `match (n:POST)-[:HAS_LIKES]->(l:LIKES)
  where n.subject CONTAINS "${subject}" and n.emailUser <> "${email}" and not l.users CONTAINS "${email}" set n.id = id(n) 
  return properties(n)`;
  const SuggestedNode = await session.executeWrite((tx) => {
    return tx.run(query2, {});
  });
  return SuggestedNode;
};

exports.getUserIntersts = async function (email) {
  let query1 = `match(n:User {email: "${email}"}) return n.intersts as intersts`;

  const interstsNode = await session.executeRead((tx) => {
    return tx.run(query1, {});
  });

  return interstsNode;
};
