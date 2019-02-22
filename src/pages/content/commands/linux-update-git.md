# 2019/02/19 [Linux更新Git](https://www.jianshu.com/p/512d25c9df10)

- 执行命令：`yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker`
- 卸载旧版本git: `yum remove git`
- 下载git: `wget https://github.com/git/git/archive/v2.16.2.tar.gz`
- 解压：`tar xzf git-1.9.0.tar.gz`
- 进入解压后的git安装目录：`cd git-xxx`
- 编译：`make prefix=/usr/local/git all`
- 安装：`make prefix=/usr/local/git install`
- 编辑环境变量配置（给到所有用户）：`vim /etc/profile`
- profile文件末尾追加：`export PATH=$PATH:/usr/local/git/bin`
- 刷新配置：`source /etc/profile`
- 查看版本：`git --version`