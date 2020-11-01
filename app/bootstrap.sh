#!/usr/bin/env bash

install_pip3() {
  echo "Installing pip3"
  sudo apt-get update
  sudo apt-get install -y python3-pip
  PYTHONLOCATION=$(python3 -m site --user-base)
  echo "export PATH=$PYTHONLOCATION/bin:$PATH" >> ~/.profile
  source ~/.profile
}

install_homebrew() {
  if [ "$(uname)" == "Darwin" ]; then
    echo "Installing Homebrew"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
}

install_docker() {
  echo "Installing Docker CE"
  if [ "$(uname)" == "Darwin" ]; then
    brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve
    sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
    sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
    docker-machine create default --driver xhyve --xhyve-experimental-nfs-share
    eval $(docker-machine env default)
  else
    echo "Setting up Docker Registry"
    sudo apt-get update
    sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    echo "Installing Docker CE"
    sudo apt-get update
    sudo apt-get install docker-ce -y
  fi
}

install_aws_cli() {
  echo "Installing AWS CLI"
  if [ "$(uname)" == "Darwin" ]; then
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
  else
    sudo apt-get update
    sudo apt-get install unzip
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
  fi
}

install_sam_cli() {
  echo "Installing SAM CLI"
  if [ "$(uname)" == "Darwin" ]; then
    brew tap aws/tap
    brew install aws-sam-cli
  else
    pip3 install aws-sam-cli
  fi
}

command -v pip3 > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "pip3 already installed"
else
  install_pip3
fi

command -v brew > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Homebrew already installed"
else
  install_homebrew
fi

command -v docker > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Docker already installed"
else
  install_docker
fi

command -v aws > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "AWS CLI already installed"
else
  install_aws_cli
fi

command -v sam > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "SAM CLI already installed"
else
  install_sam_cli
fi