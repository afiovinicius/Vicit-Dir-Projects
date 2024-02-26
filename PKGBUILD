# Maintainer: Afio <pkgbuilds at Afio>
pkgname=vicit-projects
pkgver=1.1.1
pkgrel=1
pkgdesc="Manager start project model Vicit Studio."
arch=('x86_64')
url="https://github.com/afiovinicius/Vicit-Dir-Projects"
license=('MIT')
depends=(
  'git'
  'electron'
)
makedepends=(
  'electron'
  'yarn'
)

source=("${pkgname}-${pkgver}.tar.gz::https://github.com/afiovinicius/Vicit-Dir-Projects/archive/v${pkgver}.tar.gz")
sha256sums=('SKIP')

prepare() {
  rm -rf "${srcdir}/${pkgname}-${pkgver}"
  tar xf "${pkgname}-${pkgver}.tar.gz"
}

build() {
  cd "$srcdir/Vicit-Dir-Projects-$pkgver"
  yarn install
  yarn build-linux
}

package() {
  cd "$srcdir/Vicit-Dir-Projects-$pkgver/dist"
  install -Dm644 package.json "$pkgdir/usr/share/${pkgname}/package.json"
  makepkg -fci
}
