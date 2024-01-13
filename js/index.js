const form = document.getElementById("github-form");
const search = document.getElementById("search");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = search.value.trim(); // input sanitized
  if (input.length < 1) {
    alert("Invalid search");
    return;
  }
  fetch(`https://api.github.com/search/users?q=${input}`)
    .then((response) => response.json())
    .then((data) => displayUsers(data));
});

const displayUsers = (data) => {
  const users = data.items;
  let list = document.getElementById("user-list");
  let userList = '';
  //console.log(users);
  users.forEach(eachUser => {
    userList += `<li id='${eachUser.id}' onclick="userRepos('${eachUser.repos_url}')">${eachUser.login}</li>`
  });
  list.innerHTML = userList;
};

const userRepos = (repos) => {
    //console.log(repos);
    fetch(repos)
    .then((response) => response.json())
    .then((data) => displayRepos(data));
}

const displayRepos = (data) => {
    console.log(data)
    const repos = data;
    let repoList = document.getElementById("repos-list");
    let list = '';
    console.log(repos);
    repos.forEach(repo => {
      list += `<li id='${repo.id}' onclick="userRepos('${repo.repos_url}')">${repo.name}</li>`
    });
    repoList.innerHTML = list;
  };