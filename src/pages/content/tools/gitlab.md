# 2019/01/31 gitlab

## [安装](https://www.cnblogs.com/weifeng1463/p/7714492.html)
  1. 配置yum源: `vim /etc/yum.repos.d/gitlab-ce.repo`
    ```shell
      [gitlab-ce]
      name=Gitlab CE Repository
      baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
      gpgcheck=0
      enabled=1
    ```
  2. 更新本地yum缓存: `yum makecache`
  3. 安装GitLab社区版: `yum install gitlab-ce`

## [卸载](https://blog.whsir.com/post-1469.html)
  1. `gitlab-ctl stop`
  2. `rpm -e gitlab-ce`
  3. `ps aux | grep gitlab`
  4. `kill -9 带有好多.............的进程`
  5. `find / -name gitlab | xargs rm -rf`

## 常用命令
  1. 启动所有gitlab组件: `gitlab-ctl start`
  2. 停止所有gitlab组件: `gitlab-ctl stop`
  3. 重启所有gitlab组件: `gitlab-ctl restart`
  4. 查看服务状态: `gitlab-ctl status`
  5. 启动服务: `gitlab-ctl reconfigure`
  6. 修改默认的配置文件: `vim /etc/gitlab/gitlab.rb`
  7. 检查gitlab: `gitlab-rake gitlab:check SANITIZE=true --trace`
  8. 查看日志: `gitlab-ctl tail`