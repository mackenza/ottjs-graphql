'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _github = require('../api/github');

var _graphql = require('graphql');

var _lodash = require('lodash');

var CommitAuthorType = new _graphql.GraphQLObjectType({
  name: 'GithubCommitAuthor',
  description: 'Commit author that is not associated with a Github acount',
  fields: {
    email: { type: _graphql.GraphQLString },
    name: { type: _graphql.GraphQLString }
  }
});

var UserType = new _graphql.GraphQLObjectType({
  name: 'GithubUser',
  fields: function fields() {
    return {
      login: { type: _graphql.GraphQLString },
      id: { type: _graphql.GraphQLInt },
      company: { type: _graphql.GraphQLString },
      avatar_url: { type: _graphql.GraphQLString },
      repos: {
        type: new _graphql.GraphQLList(RepoType),
        resolve: function resolve(user) {
          return (0, _github.getReposForUser)(user.login);
        }
      }
    };
  }
});

var UserOrCommitAuthorType = new _graphql.GraphQLUnionType({
  name: 'UserOrStringType',
  resolveType: function resolveType(author) {
    if ((0, _lodash.isObject)(author) && author.login) {
      return UserType;
    }
    return CommitAuthorType;
  },
  types: [CommitAuthorType, UserType]
});

var CommitType = new _graphql.GraphQLObjectType({
  name: 'GithubCommit',
  fields: function fields() {
    return {
      sha: { type: _graphql.GraphQLString },
      author: {
        type: UserOrCommitAuthorType
      },
      message: {
        type: _graphql.GraphQLString,
        resolve: function resolve(commit) {
          return commit.commit && commit.commit.message;
        }
      }
    };
  }
});

var IssueCommentType = new _graphql.GraphQLObjectType({
  name: 'GithubIssueCommentType',
  fields: {
    id: { type: _graphql.GraphQLInt },
    body: { type: _graphql.GraphQLString },
    user: {
      type: UserType,
      resolve: function resolve(issueComment) {
        return issueComment.user;
      }
    }
  }
});

var grabUsernameAndReponameFromURL = function grabUsernameAndReponameFromURL(url) {
  var array = url.split('/repos/')[1].split('/issues')[0].split('/');
  return {
    username: array[0],
    reponame: array[1]
  };
};

var IssueType = new _graphql.GraphQLObjectType({
  name: 'GithubIssue',
  fields: {
    id: { type: _graphql.GraphQLInt },
    title: { type: _graphql.GraphQLString },
    body: { type: _graphql.GraphQLString },
    commentCount: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(issue) {
        return issue.comments;
      }
    },
    comments: {
      type: new _graphql.GraphQLList(IssueCommentType),
      resolve: function resolve(issue) {
        var _grabUsernameAndRepon = grabUsernameAndReponameFromURL(issue.url);

        var username = _grabUsernameAndRepon.username;
        var reponame = _grabUsernameAndRepon.reponame;

        return (0, _github.getCommentsForIssue)(username, reponame, issue);
      }
    }
  }
});

var RepoType = new _graphql.GraphQLObjectType({
  name: 'GithubRepo',
  fields: {
    id: { type: _graphql.GraphQLInt },
    name: { type: _graphql.GraphQLString },
    commits: {
      type: new _graphql.GraphQLList(CommitType),
      resolve: function resolve(repo) {
        return (0, _github.getCommitsForRepo)(repo.owner.login, repo.name);
      }
    },
    issues: {
      type: new _graphql.GraphQLList(IssueType),
      args: {
        limit: { type: _graphql.GraphQLInt }
      },
      resolve: function resolve(repo, _ref) {
        var limit = _ref.limit;

        return (0, _github.getIssuesForRepo)(repo.owner.login, repo.name).then(function (issues) {
          if (limit) {
            return issues.slice(0, limit);
          }
          return issues;
        });
      }
    }
  }
});

var githubType = new _graphql.GraphQLObjectType({
  name: 'GithubAPI',
  description: 'The Github API',
  fields: {
    user: {
      type: UserType,
      args: {
        username: {
          description: 'Username of the user',
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        }
      },
      resolve: function resolve(root, _ref2) {
        var username = _ref2.username;

        return (0, _github.getUser)(username);
      }
    },
    repo: {
      type: RepoType,
      args: {
        name: {
          description: 'Name of the repo',
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        },
        ownerUsername: {
          description: 'Username of the owner',
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        }
      },
      resolve: function resolve(root, _ref3) {
        var ownerUsername = _ref3.ownerUsername;
        var name = _ref3.name;

        return (0, _github.getRepoForUser)(ownerUsername, name);
      }
    }
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: githubType
});
exports.default = Schema;