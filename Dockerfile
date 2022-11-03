# syntax=docker.io/docker/dockerfile:1.4
FROM toolchain-python

WORKDIR /opt/cartesi/dapp
COPY . .

RUN <<EOF
cd server
ls
python3 -m crossenv $(which python3) .env
ls
. .env/bin/activate
pip install -r requirements.txt
EOF

# Install build dependencies
RUN <<EOF
apt-get update
DEBIAN_FRONTEND="noninteractive" apt-get install -y \
  cmake \
  git \
  protobuf-compiler
rm -rf /var/lib/apt/lists/*
EOF

# Build ipfs-tiny
ENV IPFS_TINY_VERSION=7bfb6b3141ac83fcc8576d7f23312e2c9c98f71d
WORKDIR /tmp
RUN <<EOF
git clone https://gitlab.com/librespacefoundation/ipfs-tiny.git --recursive
cd ipfs-tiny
git reset --hard ${IPFS_TINY_VERSION}
mkdir -p build dist/include dist/lib
cd build
cmake \
  -DENABLE_TESTING=OFF \
  -DCMAKE_C_COMPILER=riscv64-cartesi-linux-gnu-gcc \
  -DCMAKE_CXX_COMPILER=riscv64-cartesi-linux-gnu-g++ \
  -DCMAKE_AR=riscv64-cartesi-linux-gnu-ar \
  -DCMAKE_RANLIB=riscv64-cartesi-linux-gnu-ranlib \
  -DCMAKE_STRIP=riscv64-cartesi-linux-gnu-strip \
  ..
make
cp src/libipfs-tiny.so ../dist/lib
cp -r ../include ../dist
EOF

# Enter directory for building dapp
WORKDIR /opt/cartesi/dapp
