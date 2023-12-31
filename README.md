# Pre Setup

setup docker desktop https://www.docker.com/products/docker-desktop - enable kubernetes

```
brew install kubectl
brew install yq
brew install watch
brew install eksctl
brew install ansible
```

# Setup

```
mkdir -p ~/git/
cd ~/git
git clone git@gitlab.com:comply/comply.git
cd ~/git/comply
chmod +x ./run
./run library
./run library-web
./run dns
./run setup
```

# Workflow

```
export BRANCH=mybranch
./run create-branch
./run checkout
./run pull
./run push "YOURCOMMENT"
./run update-from-main
./run merge-to-main
```

# Commands
| command                   | description                                 | Example                       |
| ------------------------- | ------------------------------------------- | ----------------------------- |
| setup                     | deploy services to local kubernetes         | ./run setup                   |
| destroy                   | remove services from local kubernetes       | ./run destroy                 |
| create-branch             | creates a branch from master branch         | ./run create-branch           |
| checkout                  | switches to a branch                        | ./run checkout                |
| push                      | commit changes for current branch           | ./run push "new features"     |
| pull                      | get latest from your branch                 | ./run pull                    |
| update-from-main          | update your branch with latest from main    | ./run update-from-main        |
| merge-to-main             | merge your branch into main branch          | ./run merge-to-main           |
| merge-to-deploy           | merge main to dev or prod                   | ./run merge-to-deploy dev     |
| admin                     | run admin dev server                        | ./run admin                   |
| app                       | run app dev server                          | ./run app                     |
| market                    | run market dev server                       | ./run market                  |
| dns                       | set local DNS entries                       | ./run dns                     |
| ssh                       | ssh into a pod                              | ./run ssh portal-api          |
| logs                      | view pod logs                               | ./run logs portal-api         |
| database                  | ssh into database                           | ./run database                |
| database update           | update databse with latest schema           | ./run database update         |
| database orm              | generate orm files from current database    | ./run database orm            |
| database all              | runs update, orm, and library               | ./run database all            |
| database setup            | setup initial database                      | ./run database setup          |
| database refresh          | delete and recreate database                | ./run database refresh        |
| database schedule         | run a database scheduled job                | ./run database schedule daily |
| database-restore-priority |                                             |                               |
| database-sync-from        |                                             |                               |
| database-sync-to          |                                             |                               |
| database-restore          |                                             |                               |
| database-loadtest         |                                             |                               |
| database-logs             | view database jobs pod logs                 | ./run database-logs setup     |
| cron                      |                                             | ./run cron consumption        |
| cron-logs                 |                                             | ./run cron-logs consumption   |
| restart                   | restart pods                                | ./run restart portal-api      |
| library                   | update repos with new library code          | ./run library                 |
| library-web               | update repos with new library-web code      | ./run library-web             |
| ncu                       | update all node dependencies                | ./run ncu                     |
| watch                     | monitor k8s pods                            | ./run watch                   |
| k8s-clean                 | delete invalid pods                         | ./run k8s-clean               |
| k8s-logs                  | view k8s system logs                        | ./run k8s-logs                |
| clean                     | deletes all dependency files                | ./run clean                   |
| context                   | swtich kubectl context to docker-desktop    | ./run context                 |
| build-image               | update local dev image with latest packages | ./run build-image             |
#   p o s - 1  
 