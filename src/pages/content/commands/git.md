# GIT

### 2018/06/03 修复历史提交记录的用户名和邮箱
```shell
  git filter-branch -f  --env-filter '
  OLD_EMAIL="old@email.com"
  CORRECT_NAME="zjdgx"
  CORRECT_EMAIL="new@email.com"
  if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
  then
      export GIT_COMMITTER_NAME="$CORRECT_NAME"
      export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
  fi
  if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
  then
      export GIT_AUTHOR_NAME="$CORRECT_NAME"
      export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
  fi
  ' --tag-name-filter cat -- --branches --tags
```

### 2018/05/11 修改gitignore
```
  git rm -r --cached .
```

### 2018/04/20
  1. git根据commit id查看修改的文件名字
    `git diff-tree --no-commit-id --name-only -r b7c96a0`
  2. 查看某次提交中某个文件修改内容
    `git diff b7c96a0^ b7c96a0 /path/to/file`

### 2018/03/11: git config
```bash
[core]
  excludesfile = /Users/dealmoon-zjdgx/.gitignore_global
[difftool "sourcetree"]
  cmd = opendiff \"$LOCAL\" \"$REMOTE\"
  path = 
[mergetool "sourcetree"]
  cmd = /Applications/SourceTree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
  trustExitCode = true
[user]
  name = 
  email = 
[commit]
  template = /Users/dealmoon-zjdgx/.stCommitMsg
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    last = log -1 HEAD
    cf = config
    md = commit --amend
    dt = difftool
    mt = mergetool
    line = log --oneline
    latest = for-each-ref --sort=-committerdate --format='%(committerdate:short) %(refname:short) [%(committername)]'
    ls = log --pretty=format:\"%C(yellow)%h %C(cyan)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
    log2=log --pretty=format:\"%Cgreen%ai [%h] %C(cyan)<%an> %Cred%s\" --date-order
    hist = log --pretty=format:\"%C(yellow)%h %C(green)[%an] %C(cyan)%ad %C(red)%d %C(reset)%s\" --topo-order --graph --date=short
    type = cat-file -t
    dump = cat-file -p
    su = stash save -u
    sl = stash list
    sp = stash pop
    sd = stash drop
    ss = stash show
    # 显示一次提交的所有文件名
    sf = "!f() { git show --pretty=\"\" --name-only \"$1\"; }; f"
    # 显示一次提交中某个文件的修改内容
    sfd = "!f() { git show \"$1\" -- \"$2\"; }; f"
[color]
    diff = auto
    status = auto
    branch = auto
    ui = true
[http]
    sslverify = true
[https]
    sslverify = true
[push]
    default = matching
[merge]
    tool = meld
[diff]
    tool = meld
```

### 2017/11/15: 查看git commit修改的文件
```bash
git diff --name-only HEAD~1 HEAD
git log --oneline --name-only -3
git show commitId #查看commitId对应的修改文件的内容
```