# Demo Steps

1. simple query showing declarative nature
1. add author info: show `__typename` to show what type
1. `... on GithubUser` -> login and avatar_url
1. add `... on GithubCommitAuthor` -> name, email to show you can have both without conflict
1. add a second repo and observe the error message.
1. give each repo a name
1. introduce a fragment for author on UserOrStringType
1. show nesting that fragment in another on repo
1. introduce query variables add one for each repoName and just 1 for owner. emphasize data type and ! for required
1. introspection - look at __schema and __
