sudo -E DOCKER_BUILDKIT=1 docker build --no-cache --progress plain \
--secret id=AWS_ACCESS_KEY_ID,env=AWS_ACCESS_KEY_ID \
--secret id=AWS_SECRET_ACCESS_KEY,env=AWS_SECRET_ACCESS_KEY \
 -t back_end -f Dockerfile .