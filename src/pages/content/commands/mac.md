# MAC Commands

### 用户、组操作
  - 查看所有组: `dscacheutil -q group`
  - 添加用户: `dscl . -create /Users/george NFSHomeDirectory /Users/george`
  - 改密码: `dscl . -passwd /Users/george [password]`

### 2018/06/03: 目录结构树
  ```shell
    brew install tree # 安装tree
    tree -L 2 # 显示2级目录结构
  ```

### 2017/10/14: 设置时区

```shell
  // 设置时区
  sudo systemsetup -settimezone America/Los_Angeles

  // 显示时区
  sudo systemsetup -gettimezone
```

### 2017/10/11: 由文件内容查找文件
 - `mdfind -onlyin . 'kMDItemTextContent == *font10* cdw'`