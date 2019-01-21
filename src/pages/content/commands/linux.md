# Linux

## 用户操作
  - 查看所有组: `cat /etc/group`
  - 添加组: `groupadd [groupName]`
  - 编辑组: `groupmod -n [newGroupName] [oldGroupName]`
  - 查看所有用户: `cat /etc/passwd`
  - 改变用户组: `usermod -g [groupName] [userName]`
  - 给用户添加目录操作权限: `setfacl -m u:george:rwx /home/`

## vi查找替换
`%s/\/path1\/to\/file/\/path2\/to\/file`

## 由文件内容查找文件
`grep -rnw '/path/to/somewhere/' -e 'pattern'`

## 2017/11/13: 设置时区

`cp /usr/share/zoneinfo/America/Los_Angeles /etc/localtime`

## 2017/03/02: 批量移动mp3文件

```
find /path/to/Music -type f -name "*.mp3" |while read line;
do
  mv "$line" "/target/path"
done
```

## 2017/02/28: [linux时间同步](http://www.jb51.net/LINUXjishu/73979.html)

```
ntpdate cn.pool.ntp.org;
rm -rf /etc/localtime;
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```