# Update Development Container

```
./run build-image
```

# Update Development Container Manually
```
mkdir -p ~/git/comply/local/docker/database/
cp ~/git/comply/database/package.json ~/git/comply/local/docker/database/

mkdir -p ~/git/comply/local/docker/library/
cp ~/git/comply/library/package.json ~/git/comply/local/docker/library/

mkdir -p ~/git/comply/local/docker/admin/api/
cp ~/git/comply/sites/admin/api/package.json ~/git/comply/local/docker/admin/api/

mkdir -p ~/git/comply/local/docker/app/api/
cp ~/git/comply/sites/app/api/package.json ~/git/comply/local/docker/app/api/

mkdir -p ~/git/comply/local/docker/market/api/
cp ~/git/comply/sites/market/api/package.json ~/git/comply/local/docker/market/api/

mkdir -p ~/git/comply/local/docker/workers/
cp ~/git/comply/workers/package.json ~/git/comply/local/docker/workers/

mkdir -p ~/git/comply/local/docker/pubsub/
cp ~/git/comply/services/pubsub/package.json ~/git/comply/local/docker/pubsub/

mkdir -p ~/git/comply/local/docker/cron
cp ~/git/comply/cron/package.json ~/git/comply/local/docker/cron/

mkdir -p ~/git/comply/local/docker/helper/
cp ~/git/comply/local/helper/package.json ~/git/comply/local/docker/helper/

cd ~/git/comply/local/docker
docker buildx build --no-cache --platform linux/amd64 -t comply:latest .
docker tag comply:latest ghafran/comply:latest
docker push ghafran/comply:latest
```

# test
```
docker scan ghafran/comply:latest
docker stop test
docker rm test
docker run -it --name test ghafran/comply:latest ash
```
