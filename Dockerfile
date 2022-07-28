FROM public.ecr.aws/docker/library/node:latest as build
WORKDIR /app

# Copy in the package file as well as other yarn
# dependencies in the local directory, assuming the
# yarn berry release module is inside .yarn/releases
# already
COPY package.json yarn.lock .yarn ./

RUN yarn install
COPY . .

EXPOSE 3000
CMD yarn start
