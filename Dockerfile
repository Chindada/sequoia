FROM busybox:stable
ENV TZ=Asia/Taipei \
    ROOT_PATH=/usr/share/sequoia
RUN mkdir -p ${ROOT_PATH}
WORKDIR ${ROOT_PATH}
COPY dist ${ROOT_PATH}/dist
COPY version.json ${ROOT_PATH}/version.json
