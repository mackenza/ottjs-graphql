'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommentsForIssue = exports.getIssuesForRepo = exports.getRepoForUser = exports.getCommitsForRepo = exports.getReposForUser = exports.getUser = undefined;

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var github = new _githubApi2.default({
  token: process.env.GITHUB_TOKEN,
  auth: 'oauth'
});

var getUser = exports.getUser = function getUser(username) {
  var user = github.getUser();
  return new Promise(function (resolve, reject) {
    user.show(username, function (err, user) {
      if (user) {
        resolve(user);
      } else {
        reject(err);
      }
    });
  });
};

var getReposForUser = exports.getReposForUser = function getReposForUser(username) {
  var user = github.getUser();
  return new Promise(function (resolve, reject) {
    user.userRepos(username, function (err, repos) {
      if (repos) {
        resolve(repos);
      } else {
        reject(err);
      }
    });
  });
};

var getCommitsForRepo = exports.getCommitsForRepo = function getCommitsForRepo(username, reponame) {
  var repo = github.getRepo(username, reponame);
  return new Promise(function (resolve, reject) {
    repo.getCommits({}, function (err, commits) {
      if (commits) {
        resolve(commits);
      } else {
        reject(err);
      }
    });
  });
};

var getRepoForUser = exports.getRepoForUser = function getRepoForUser(username, reponame) {
  var repo = github.getRepo(username, reponame);
  return new Promise(function (resolve, reject) {
    repo.show(function (err, repo) {
      if (repo) {
        resolve(repo);
      } else {
        reject(err);
      }
    });
  });
};

var getIssuesForRepo = exports.getIssuesForRepo = function getIssuesForRepo(username, reponame) {
  var issues = github.getIssues(username, reponame);
  return new Promise(function (resolve, reject) {
    issues.list({}, function (err, issues) {
      if (issues) {
        resolve(issues);
      } else {
        reject(err);
      }
    });
  });
};

var getCommentsForIssue = exports.getCommentsForIssue = function getCommentsForIssue(username, reponame, issue) {
  var issues = github.getIssues(username, reponame);
  return new Promise(function (resolve, reject) {
    issues.getComments(issue, function (err, comments) {
      if (comments) {
        resolve(comments);
      } else {
        reject(err);
      }
    });
  });
};