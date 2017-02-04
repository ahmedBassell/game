FROM node:onbuild

RUN apt-get update
RUN apt-get install -y ruby-full rubygems-integration
RUN gem install sass

RUN npm install -g bower gulp
RUN bower install --root-allow
RUN gulp tasks
