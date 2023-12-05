# Maintainer: Afio <pkgbuilds at Afio>
pkgname=vicit-projects
pkgver=1.1.1
pkgrel=1
pkgdesc="Manager start project model Vicit Studio."
arch=('x86_64')
url="https://github.com/afiovinicius/Vicit-Dir-Projects"
license=('MIT')
depends=(
  'pacman'
  'git'
  'electron'
)

source=("${pkgname}-${pkgver}.tar.gz::https://github.com/afiovinicius/Vicit-Dir-Projects/archive/v${pkgver}.tar.gz")
sha256sums=('SKIP')

prepare() {
  tar xf "${pkgname}-${pkgver}.tar.gz"
}

build() {
  cd "$srcdir/Vicit-Dir-Projects-$pkgver"
  yarn install
  yarn build-linux
}

package() {
  cd "$srcdir/$pkgname-$pkgver"/dist
  sudo pacman -U $pkgname-$pkgver.pacman
#   makepkg -sic --skippgpcheck
#   cp -r dist/"$pkgname-$pkgver.pacman" "$pkgdir/opt/$pkgname/"
  chmod +x "$pkgdir/opt/$pkgname/vicit-projects"
}
